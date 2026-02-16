/**
 * MicroMind Base Template — i18n Completeness Checker
 * 
 * Validates that all translation keys are present across all 5 locale files.
 * Run: node scripts/check-i18n.js
 * 
 * Usage:
 *   node scripts/check-i18n.js          # Check all locales
 *   node scripts/check-i18n.js --fix    # Show missing keys with placeholder values
 */

const fs = require('fs');
const path = require('path');

const LOCALES_DIR = path.join(__dirname, '..', 'client', 'src', 'locales');
const LOCALE_FILES = ['en.json', 'ar.json', 'fr.json', 'de.json', 'sw.json'];
const REFERENCE_LOCALE = 'en.json';

// Flatten nested JSON to dot-notation keys
function flattenKeys(obj, prefix = '') {
    let keys = [];
    for (const key of Object.keys(obj)) {
        const fullKey = prefix ? `${prefix}.${key}` : key;
        if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
            keys = keys.concat(flattenKeys(obj[key], fullKey));
        } else {
            keys.push(fullKey);
        }
    }
    return keys;
}

// Load and parse locale file
function loadLocale(filename) {
    const filepath = path.join(LOCALES_DIR, filename);
    if (!fs.existsSync(filepath)) {
        console.error(`❌ Missing locale file: ${filename}`);
        return null;
    }
    try {
        const content = fs.readFileSync(filepath, 'utf-8');
        return JSON.parse(content);
    } catch (err) {
        console.error(`❌ Invalid JSON in ${filename}: ${err.message}`);
        return null;
    }
}

function main() {
    const showFix = process.argv.includes('--fix');

    console.log('🌍 MicroMind i18n Completeness Check');
    console.log('═'.repeat(50));
    console.log(`📁 Locales directory: ${LOCALES_DIR}`);
    console.log(`📋 Reference locale: ${REFERENCE_LOCALE}`);
    console.log(`🔍 Checking: ${LOCALE_FILES.join(', ')}`);
    console.log('');

    // Load reference locale (English)
    const refData = loadLocale(REFERENCE_LOCALE);
    if (!refData) {
        console.error('Cannot proceed without reference locale.');
        process.exit(1);
    }

    const refKeys = flattenKeys(refData);
    console.log(`📊 Reference locale has ${refKeys.length} keys\n`);

    let totalMissing = 0;
    let totalExtra = 0;
    const results = {};

    for (const file of LOCALE_FILES) {
        if (file === REFERENCE_LOCALE) continue;

        const data = loadLocale(file);
        if (!data) {
            results[file] = { missing: refKeys.length, extra: 0, status: 'ERROR' };
            totalMissing += refKeys.length;
            continue;
        }

        const localeKeys = flattenKeys(data);
        const missing = refKeys.filter(k => !localeKeys.includes(k));
        const extra = localeKeys.filter(k => !refKeys.includes(k));

        results[file] = { missing: missing.length, extra: extra.length, keys: { missing, extra } };
        totalMissing += missing.length;
        totalExtra += extra.length;

        if (missing.length === 0 && extra.length === 0) {
            console.log(`✅ ${file} — Complete (${localeKeys.length} keys)`);
        } else {
            console.log(`⚠️  ${file} — ${missing.length} missing, ${extra.length} extra`);

            if (missing.length > 0) {
                console.log(`   Missing keys:`);
                missing.forEach(k => {
                    if (showFix) {
                        console.log(`     "${k}": "[TODO: translate] ${getNestedValue(refData, k)}"`);
                    } else {
                        console.log(`     - ${k}`);
                    }
                });
            }

            if (extra.length > 0) {
                console.log(`   Extra keys (not in ${REFERENCE_LOCALE}):`);
                extra.forEach(k => console.log(`     + ${k}`));
            }
        }
        console.log('');
    }

    // Summary
    console.log('═'.repeat(50));
    if (totalMissing === 0 && totalExtra === 0) {
        console.log('🎉 All locales are complete! No missing translations.');
        process.exit(0);
    } else {
        console.log(`⚠️  Total: ${totalMissing} missing keys, ${totalExtra} extra keys`);
        if (!showFix && totalMissing > 0) {
            console.log('\n💡 Run with --fix to see placeholder values for missing keys');
        }
        process.exit(1);
    }
}

// Get nested value from object using dot-notation key
function getNestedValue(obj, key) {
    return key.split('.').reduce((o, k) => (o && o[k] !== undefined ? o[k] : ''), obj);
}

main();
