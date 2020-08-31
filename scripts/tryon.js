/**
 * Try-on demo API usage for javascript
 * This page expects ECMAScript 2019+
 * @author: Jae Yong Lee(lee896@illinois.edu)
 */
const loadingPage = document.getElementById("card-loading");
const loadedPage = document.getElementById("card-loaded");
const mainImage = document.getElementById("tryon-main-image");
const mainTitle = document.getElementById("tryon-id");
const tryoutRow = document.getElementById("tryon-tryout-row");
const tryonNext = document.getElementById("tryon-next-button");

function createTryableDiv(model_file, model_id){
  const div = document.createElement('div');
  const img = document.createElement('img');

  div.classList.add('tryon-tryout-container', 'col-6', 'col-md-4');
  img.classList.add('tryon-tryout-image', 'img-thumbnail');
  img.src = get_tryout_url(model_id);
  div.appendChild(img);
  div.onclick = applyTryout.bind(null, model_file, model_id);
  return div;
}

async function applyTryout(model_file, model_id){
  const model_url = await generate_model_and_product(model_file, model_id);
  mainImage.src = get_image_url(model_url);
}

function displayLoadedPage(){
  loadingPage.classList.add('hidden');
  loadedPage.classList.remove('hidden');
}

function displayLoadingPage(){
  loadingPage.classList.remove('hidden');
  loadedPage.classList.add('hidden');
}

async function loadNewImage(){
  // set loading page to loading.
  displayLoadingPage();

  // generate new metadata
  const metadata = await get_model_metadata();
  // obtain model_file from main image and tryable images
  const mainModelFile = metadata.model_file;
  mainImage.src = get_image_url(mainModelFile);
  mainTitle.innerHTML = metadata.model_file;

  // clear tryoutables
  tryoutRow.innerHTML = '';

  for (const [wearType, modelIds] of Object.entries(metadata.recommendation_dict)) {
    const modelDivs = modelIds.map(createTryableDiv.bind(null, mainModelFile));
    modelDivs.forEach(tryoutRow.appendChild.bind(tryoutRow));
  }


  // display loadde page
  displayLoadedPage();
}

// run command on loading document
loadNewImage();
tryonNext.onclick = loadNewImage;
