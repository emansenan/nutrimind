const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Starting database seed...');

    // Create demo admin user
    const adminPassword = await bcrypt.hash('admin123', 10);
    const admin = await prisma.user.upsert({
        where: { email: 'admin@micromind.com' },
        update: {},
        create: {
            email: 'admin@micromind.com',
            passwordHash: adminPassword,
            displayName: 'Admin User',
            role: 'ADMIN',
            active: true
        }
    });
    console.log('✅ Created admin user:', admin.email);

    // Create demo regular user
    const userPassword = await bcrypt.hash('user123', 10);
    const user = await prisma.user.upsert({
        where: { email: 'user@micromind.com' },
        update: {},
        create: {
            email: 'user@micromind.com',
            passwordHash: userPassword,
            displayName: 'Demo User',
            role: 'USER',
            active: true
        }
    });
    console.log('✅ Created demo user:', user.email);

    // Create sample dashboard
    const dashboard = await prisma.dashboard.create({
        data: {
            userId: admin.id,
            title: 'System Overview',
            description: 'Default system dashboard',
            sqlQuery: 'SELECT COUNT(*) as total_users FROM users;',
            chartConfig: {
                type: 'bar',
                xAxis: 'category',
                yAxis: 'value'
            },
            isPublic: true
        }
    });
    console.log('✅ Created sample dashboard:', dashboard.title);

    // Create sample documents
    const doc1 = await prisma.document.create({
        data: {
            title: 'Getting Started Guide',
            description: 'Introduction to the platform',
            fileType: 'PDF',
            s3Path: '/demo/getting-started.pdf',
            size: 1024000,
            uploadedBy: admin.id,
            tags: ['guide', 'tutorial'],
            metadata: { category: 'documentation' }
        }
    });
    console.log('✅ Created sample document:', doc1.title);

    console.log('');
    console.log('🎉 Database seeded successfully!');
    console.log('');
    console.log('📝 Demo Credentials:');
    console.log('   Admin: admin@micromind.com / admin123');
    console.log('   User:  user@micromind.com / user123');
    console.log('');
}

main()
    .catch((e) => {
        console.error('❌ Seed failed:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
