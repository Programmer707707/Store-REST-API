const Product = require('../models/product');

const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({}).select('name price');
  res.status(200).json({ products, nbHits: products.length });
};

const getAllProducts = async (req, res) => {
  let { featured, company, name, sort, fields, numericFilters } = req.query;
  let queryObject = {};


  if (featured) {
    queryObject.featured = featured === 'true' ? true : false;
  }

  if (company) {
    queryObject.company = company;
  }

  if (name) {
    queryObject.name = { $regex: name, $options: 'i' }; // case-insensitive regex search
  }

  if(numericFilters){
    const operatorMap = {
        '>': `$gt`,
        '>=': '$gte',
        '=': 'e',
        '<': '$lt',
        '<=': '$lte',
    }
    const regEx = /\b(<|>|>=|=|<|<=)\b/g
    let filters = numericFilters.replace(regEx, (match)=> `-${operatorMap[match]}-`)
    const options = ['price', 'rating']
    
    filters = filters.split(',').forEach((item)=>{
        const [field, operator,value] = item.split('-')

        if(options.includes(field)){
            queryObject[field] = {[operator]: Number(value)}
        }
    })
  }

  //mongoose query object
  let result = Product.find(queryObject);

  //sort
  if (sort) {
    const sortList = sort.split(',').join(' '); 
    console.log("Sort list: ", sortList);
    result = result.sort(sortList); 
  } else {
    result = result.sort('createdAt');
  }

  //select fields
  if (fields) {
    const selectList = fields.split(',').join(' ');
    result = result.select(selectList); 
  }

  const page = Number(req.query.page) || 1
  const limit = Number(req.query.limit) || 10
  const skip = (page-1) * limit

  result = result.skip(skip).limit(limit)

  const products = await result;
  res.status(200).json({ products, nbHits: products.length });
};

module.exports = { getAllProductsStatic, getAllProducts };
