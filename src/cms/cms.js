import CMS from 'netlify-cms-app';
import HomePagePreview from './preview-templates/HomePagePreview';

CMS.registerPreviewStyle('./fontawesome.css');

CMS.registerPreviewTemplate('home', HomePagePreview);
