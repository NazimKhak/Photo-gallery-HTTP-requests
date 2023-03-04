export default renderCard;
function renderCard(
  webformatURL,
  tags,
  likes,
  views,
  comments,
  downloads,
  largeImageURL
) {
  return `
  
  <a href="${largeImageURL}">
<div class="photo-card">
  <img src="${webformatURL}" class="img_setting" alt="${tags}" loading="lazy" />
  <div class="info">
    <p class="info-item">
      <b>Likes: ${likes}</b>
    </p>
    <p class="info-item">
      <b>Viesws: ${views}</b>
    </p>
    <p class="info-item">
      <b>Comments: ${comments}</b>
    </p>
    <p class="info-item">
      <b>DownLoads: ${downloads}</b>
    </p>
  </div>
</div>
</a>
`;
}
