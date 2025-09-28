const fs = require('fs');
const path = require('path');

// Validate Monday.com app manifest
function validateManifest() {
  try {
    const manifestPath = path.join(__dirname, 'manifest.json');
    const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
    
    console.log('🔍 Validating Monday.com app manifest...');
    
    // Required fields
    const requiredFields = [
      'name', 'version', 'description', 'author', 'appType', 
      'permissions', 'scopes', 'capabilities', 'iframe'
    ];
    
    const missingFields = requiredFields.filter(field => !manifest[field]);
    
    if (missingFields.length > 0) {
      console.error('❌ Missing required fields:', missingFields);
      return false;
    }
    
    // Validate iframe URL
    if (!manifest.iframe.url || !manifest.iframe.url.startsWith('https://')) {
      console.error('❌ Invalid iframe URL - must be HTTPS');
      return false;
    }
    
    // Validate permissions
    const validPermissions = [
      'me:read', 'boards:read', 'boards:write', 'items:read', 
      'items:write', 'workspaces:read', 'teams:read'
    ];
    
    const invalidPermissions = manifest.permissions.filter(
      perm => !validPermissions.includes(perm)
    );
    
    if (invalidPermissions.length > 0) {
      console.error('❌ Invalid permissions:', invalidPermissions);
      return false;
    }
    
    console.log('✅ Manifest validation passed!');
    console.log('📦 App Name:', manifest.name);
    console.log('🔗 App URL:', manifest.iframe.url);
    console.log('🔑 Permissions:', manifest.permissions.length);
    
    return true;
    
  } catch (error) {
    console.error('❌ Error validating manifest:', error.message);
    return false;
  }
}

if (require.main === module) {
  const isValid = validateManifest();
  process.exit(isValid ? 0 : 1);
}

module.exports = { validateManifest };
