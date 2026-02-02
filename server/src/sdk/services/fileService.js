/**
 * File Service - AWS S3 Integration
 * 
 * Handles file uploads, downloads, and presigned URLs for S3.
 * 
 * @module sdk/services/fileService
 */

const { S3Client, PutObjectCommand, GetObjectCommand, DeleteObjectCommand, ListObjectsV2Command } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

// Initialize S3 client
const s3Client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    }
});

const BUCKET = process.env.AWS_S3_BUCKET;

/**
 * Upload file to S3
 * @param {Buffer} fileBuffer - File buffer
 * @param {string} filename - File name
 * @param {string} folder - Folder path (e.g., 'documents', 'images')
 * @param {string} organizationId - Organization ID for folder structure
 * @param {Object} options - Additional options
 * @returns {Promise<Object>} { s3Path, url, size, contentType }
 */
async function uploadToS3(fileBuffer, filename, folder, organizationId, options = {}) {
    try {
        const { contentType, makePublic = false } = options;

        const key = `${organizationId}/${folder}/${Date.now()}-${filename}`;

        const command = new PutObjectCommand({
            Bucket: BUCKET,
            Key: key,
            Body: fileBuffer,
            ContentType: contentType,
            ACL: makePublic ? 'public-read' : 'private'
        });

        await s3Client.send(command);

        const url = makePublic
            ? `https://${BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`
            : null;

        return {
            s3Path: key,
            url,
            size: fileBuffer.length,
            contentType,
            uploadedAt: new Date()
        };
    } catch (error) {
        console.error('[File Service] Upload error:', error);
        throw error;
    }
}

/**
 * Get presigned URL for private file access
 * @param {string} s3Path - S3 object key
 * @param {number} expiresIn - Expiration in seconds (default: 3600 = 1 hour)
 * @returns {Promise<Object>} { signedUrl, expiresAt }
 */
async function getPresignedUrl(s3Path, expiresIn = 3600) {
    try {
        const command = new GetObjectCommand({
            Bucket: BUCKET,
            Key: s3Path
        });

        const signedUrl = await getSignedUrl(s3Client, command, { expiresIn });

        return {
            signedUrl,
            expiresAt: new Date(Date.now() + expiresIn * 1000)
        };
    } catch (error) {
        console.error('[File Service] Presigned URL error:', error);
        throw error;
    }
}

/**
 * Download file from S3
 * @param {string} s3Path - S3 object key
 * @returns {Promise<Buffer>} File buffer
 */
async function downloadFromS3(s3Path) {
    try {
        const command = new GetObjectCommand({
            Bucket: BUCKET,
            Key: s3Path
        });

        const response = await s3Client.send(command);

        // Convert stream to buffer
        const chunks = [];
        for await (const chunk of response.Body) {
            chunks.push(chunk);
        }

        return Buffer.concat(chunks);
    } catch (error) {
        console.error('[File Service] Download error:', error);
        throw error;
    }
}

/**
 * Delete file from S3
 * @param {string} s3Path - S3 object key
 * @returns {Promise<Object>} { success, deletedAt }
 */
async function deleteFromS3(s3Path) {
    try {
        const command = new DeleteObjectCommand({
            Bucket: BUCKET,
            Key: s3Path
        });

        await s3Client.send(command);

        return {
            success: true,
            deletedAt: new Date()
        };
    } catch (error) {
        console.error('[File Service] Delete error:', error);
        throw error;
    }
}

/**
 * List files in organization folder
 * @param {string} organizationId - Organization ID
 * @param {string} folder - Folder name
 * @param {Object} options - Listing options
 * @returns {Promise<Object>} { files, totalSize, count }
 */
async function listFiles(organizationId, folder, options = {}) {
    try {
        const prefix = `${organizationId}/${folder}/`;

        const command = new ListObjectsV2Command({
            Bucket: BUCKET,
            Prefix: prefix,
            MaxKeys: options.limit || 100
        });

        const response = await s3Client.send(command);

        const files = response.Contents?.map(item => ({
            key: item.Key,
            size: item.Size,
            lastModified: item.LastModified
        })) || [];

        const totalSize = files.reduce((sum, file) => sum + file.size, 0);

        return {
            files,
            totalSize,
            count: files.length
        };
    } catch (error) {
        console.error('[File Service] List error:', error);
        throw error;
    }
}

/**
 * Validate file before upload
 * @param {Object} file - File object (from multer)
 * @param {Object} rules - Validation rules
 * @returns {Object} { valid, errors }
 */
function validateFile(file, rules = {}) {
    const errors = [];
    const { maxSize = 10 * 1024 * 1024, allowedTypes = [] } = rules;

    // Check size
    if (file.size > maxSize) {
        errors.push(`File size exceeds limit of ${maxSize} bytes`);
    }

    // Check type
    if (allowedTypes.length > 0) {
        const isAllowed = allowedTypes.some(type => {
            if (type.endsWith('/*')) {
                return file.mimetype.startsWith(type.replace('/*', ''));
            }
            return file.mimetype === type;
        });

        if (!isAllowed) {
            errors.push(`File type ${file.mimetype} not allowed`);
        }
    }

    return {
        valid: errors.length === 0,
        errors: errors.length > 0 ? errors : null
    };
}

module.exports = {
    uploadToS3,
    getPresignedUrl,
    downloadFromS3,
    deleteFromS3,
    listFiles,
    validateFile
};
