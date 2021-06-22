export const seo=(data = {title:null,metaDescription:null}) =>{
  data.title = data.title || 'SamTv Dashboard';
  data.metaDescription = data.metaDescription || 'A default live stream web app for administrators of Sam TV';

  document.title = data.title;
  document.querySelector('meta[name="description"]').setAttribute('content', data.metaDescription);
}