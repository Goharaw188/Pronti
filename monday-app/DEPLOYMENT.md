# Monday.com App Deployment Guide

## Prerequisites
- Monday.com Developer account
- Your Vercel app deployed and accessible
- Monday.com board with proper permissions

## Step 1: Prepare the App Package

### Files Required:
- `manifest.json` - App configuration
- `README.md` - App documentation  
- `package.json` - App metadata
- `validate-manifest.js` - Validation script

### Validate the Manifest:
```bash
node validate-manifest.js
```

## Step 2: Create App Package
```bash
# Create ZIP package
zip -r pronti-sales-pipeline-monday-app.zip .
```

## Step 3: Upload to Monday.com Developer Center

### Option A: Developer Center (Recommended)
1. Go to https://developer.monday.com/
2. Sign in with your Monday.com account
3. Click "Create New App"
4. Upload the ZIP package
5. Fill in app details:
   - **Name**: Pronti Sales Pipeline
   - **Description**: Beautiful lead management interface
   - **Category**: CRM/Sales
   - **App URL**: https://pronti.vercel.app
6. Configure permissions
7. Submit for review

### Option B: Direct Installation (Internal Use)
1. Go to your Monday.com workspace
2. Navigate to Apps section
3. Click "Add App"
4. Upload the manifest.json
5. Configure board settings

## Step 4: Configure App Settings

### Board Configuration:
- **Board ID**: 2073203161
- **Workspace ID**: 2299275
- **Default View**: Kanban

### Permissions Required:
- Read/Write access to boards
- Read/Write access to items
- Read access to workspaces

## Step 5: Test the Integration

### Test Checklist:
- [ ] App loads in Monday.com interface
- [ ] Can view board data
- [ ] Can create new leads
- [ ] Can update lead status
- [ ] Webhooks are working
- [ ] Authentication is working

## Step 6: Publish the App

### For Internal Use:
- App is immediately available to your workspace
- No approval process required

### For Public Distribution:
- Submit for Monday.com app store review
- Provide detailed documentation
- Include support contact information
- Wait for approval (typically 1-2 weeks)

## Troubleshooting

### Common Issues:
1. **App not loading**: Check iframe URL is accessible
2. **Permission errors**: Verify app permissions in manifest
3. **Authentication issues**: Check OAuth configuration
4. **Data not syncing**: Verify webhook configuration

### Support:
- **Email**: admin@pronti.au
- **Documentation**: https://pronti.vercel.app/docs
- **Monday.com Docs**: https://developer.monday.com/

## App URLs
- **Production**: https://pronti.vercel.app
- **Latest Deployment**: https://pronti-jmvomlxzx-gohars-projects-7febd079.vercel.app
- **Shareable Link**: https://pronti-jmvomlxzx-gohars-projects-7febd079.vercel.app/?_vercel_share=CKbrzFfRGrAo7FpFgMkJUvg9ncTesvZK
