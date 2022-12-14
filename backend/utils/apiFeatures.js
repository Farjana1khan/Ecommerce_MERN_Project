class ApiFeatures {

    constructor(query, queryStr){
        this.query = query;
        this.queryStr = queryStr

    }

    search(){
        const keyword = this.queryStr.keyword ?  {
            name: {
                $regex: this.queryStr.keyword,
                $options: "i"
            }
        }: {};

        console.log(keyword);

        this.query = this.query.find({...keyword})
        return this;
    }


    filter(){
        const queryCopy = {...this.queryStr}

        //Remove some fields for category

        const removeFields = ["keyword", "page", "limit"]

        removeFields.forEach((key)=> delete queryCopy[key])
        console.log(queryCopy);

        //Filter For Price and Rating

        let queryStr = JSON.stringify(queryCopy);
        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key)=> `$${key}`);

        
        this.query = this.query.find(JSON.parse(queryStr))
        console.log(queryStr);
        return this;
    }


    pagination(resultPerPagePagination){

        const currentPage = Number(this.queryStr.page) || 1
        const skip = resultPerPagePagination  * (currentPage - 1)
        this.query = this.query.limit(resultPerPagePagination).skip(skip)
        return this
    }


}


module.exports = ApiFeatures;