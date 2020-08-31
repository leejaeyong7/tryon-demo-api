/**
 * Try-on demo API usage for javascript
 * This page expects ECMAScript 2019+
 * @author: Jae Yong Lee(lee896@illinois.edu)
 */

API_PROTOCOL = 'http';
API_HOST = '3.137.127.110';
API_PORT = '5000';
ASSET_URL = 'https://virtual-tryon-training-data.s3.us-east-2.amazonaws.com/farfetch_images';

API_URL = `${API_PROTOCOL}://${API_HOST}:${API_PORT}`;

/**
 *  Get metadata of a generated model, item wearing, and recommendation products.
 *
 *  Arguments:
 *      model_file(str): optional model file name. 
 *                       If not provided, will return random model
 *  Return:
 *      (Object): meta data of the model.
 *      The returning object contains:
 *      {
 *         model_id(str): id of the model
 *         model_file(str): file name of the generated model
 *         wearing_products(str): list of product id the generated model is wearing.
 *                                The order is reflected in the model_file name.
 *         wearing_products_cat(dict): wearing product id map to category
 *         recommendation_dict(str): category map to list of recommended product ids
 *      }
 */
async function get_model_metadata(model_file=null){
  const params = {};
  if(model_file === null){
    params.model_file = model_file
  }
  try{
    const res = await axios.get(`${API_URL}/get_model_metadata`, {params});
    return res.data;
  } catch(e){
    window.alert(`Server communication failed with ${e}`);
  }
}

/**
 *
 *
 */
function get_image_url(model_file){
  return `${API_URL}/get_image?model_file=${model_file}`;
}

function get_tryout_url(model_id){
  return `${ASSET_URL}/${model_id}/in.jpg`;
}


/**
 *  Returns:
 *      (dict): "new_model_file":"farfetch_12979466-farfetch_13956851-farfetch_14893172-farfetch_12779825",
 */
async function generate_model_and_product(model_file, product_id){

  try{
    const params = {model_file, product_id};
    const res = await axios.get(`${API_URL}/generate_model_and_product`, {params})
    return res.data.new_model_file;
  } catch(e){
    window.alert(`Server communication failed with ${e}`);
  }
}
