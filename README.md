# Pronti Sales Pipeline - Monday.com Custom App

A beautiful, responsive React app for displaying sales pipeline data from Monday.com boards in an aesthetic and organized way.

## Features

- 🎨 **Beautiful Design**: Modern gradient backgrounds, glass-morphism effects, and smooth animations
- 📊 **Company Grouping**: Option to group leads by company for better organization
- 📱 **Responsive**: Works perfectly on desktop, tablet, and mobile devices
- 🎯 **Rich Data Display**: Shows all relevant lead information including:
  - Contact details (name, email, phone, LinkedIn, website)
  - Company information and industry
  - Engagement scores with visual progress bars
  - Pipeline stages and status indicators
  - Next actions and pain points
  - Tier classifications with color coding

## Installation & Setup

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm start
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## Deployment

### Option 1: Vercel (Recommended)
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Deploy automatically

### Option 2: Netlify
1. Build your project: `npm run build`
2. Go to [netlify.com](https://netlify.com)
3. Drag and drop your `build` folder
4. Get your deployment URL

## Monday.com Integration

1. **In Monday Developer Center:**
   - Go to your app settings
   - Under "Deployment", create a new deployment
   - Enter your deployed app URL
   - Enable for both "Item View" and "Board Multi-Item Menu"

2. **Install on Board:**
   - Go to your Monday.com board
   - Click "Apps" → "Browse apps"
   - Find and install your custom app
   - Select items and use the app from the multi-item menu

## Board Structure

This app is designed to work with the "Duplicate of Pronti Sales Pipeline" board and expects these columns:

- **Name** (name)
- **First Name** (text_mkvq79n9)
- **Last Name** (text_mkvqmkfq)
- **Company Name** (text_mkvq302h)
- **Job Title** (text_mkvq6jba)
- **Work Email** (email_mkvqvcpa)
- **Phone Number** (phone_mkvq7tjy)
- **Company Website** (link_mkvq4c9k)
- **LinkedIn Profile** (link_mkvqa21x)
- **Industry** (color_mkvq9mn1)
- **Tier** (color_mkvq2hen)
- **Status of Data** (color_mkvx9ayq)
- **Engagement Score** (numeric_mkvq46h0)
- **Next Action** (color_mkvs4gw8)
- **Next Action Due Date** (date_mkvqv4ex)
- **Pain Points** (long_text_mkvqqt5j)

## Customization

You can easily customize the app by modifying:

- **Colors**: Update the CSS variables in `src/App.css`
- **Layout**: Modify the grid system and card layouts
- **Data Fields**: Add or remove fields in `src/App.js`
- **Styling**: Update the component styles as needed

## Support

For issues or questions, please check the Monday.com developer documentation or contact the development team.
