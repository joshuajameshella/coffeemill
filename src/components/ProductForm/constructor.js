import { v4 as uuidv4 } from "uuid";
import { UpdateImage, UploadImage, DeleteImage } from "../../queries/image";
import { AddProduct, EditProduct, GetProduct, RemoveProduct } from "../../queries";

// CreateRecord takes the form values, and inserts the data into MongoDB
export function CreateRecord(values) {

    // Generate the data used when inserting data into MongoDB
    const UUID = uuidv4();
    const productData = {
        name: values.productName ? values.productName : "",
        price: values.productPrice ? values.productPrice : "",
        image: "https://coffeemillandcakesstorage.s3.eu-west-2.amazonaws.com/"+UUID+".jpg",
        description: values.productDescription ? values.productDescription : "",
        visible: values.productVisible,
    }

    // Try and upload the new image to AWS S3 Bucket.
    // If the image has successfully been uploaded, add the product data to MongoDB.
    return UploadImage(values.productImage, UUID)
        .then(() => {
            return AddProduct(productData, values.productCategory);
        }).catch((err) => { return err });
}


// EditRecord takes the old record data (via props), and updates the MongoDB record with the new form data (values)
export function EditRecord(values, props) {

    // To edit the record, the old data identifiers (MongoDB ID & S3 UUID) must be retrieved from the database.
    return GetProduct(props.initialValues.category, props.initialValues._id)
        .then((r) => {

            // If no data is returned, return nothing
            if (!r) { return null }

            // Generate the data used when inserting data into MongoDB
            const UUID = r.image.split(".com/")[1].replace(".jpg", "");
            const productData = {
                id: props.initialValues._id,
                name: values.productName ? values.productName : "",
                price: values.productPrice ? values.productPrice : "",
                image: "https://coffeemillandcakesstorage.s3.eu-west-2.amazonaws.com/"+UUID+".jpg",
                description: values.productDescription ? values.productDescription : "",
                priority: props.initialValues.priority,
                visible: values.productVisible,
            }

            // If the image hasn't been updated (Still an S3 Bucket URL), only update the product data in MongoDB.
            // Otherwise, update the image in the S3 Bucket, and (upon it's success), update the product data.
            // This is done to reduce loading times for when managing large image files are not necessary.
            if (values.productImage.includes("https://")) {
                return EditProduct(productData, props.initialValues.category)
                    .then((r) => { return r }).catch((e) => { return e });
            } else {
                return UpdateImage(UUID, values.productImage).then((r) => {
                    return EditProduct(productData, props.initialValues.category);
                }).catch((e) => { return e })
            }
        }).catch((e) => { return e });
}

// RemoveRecord takes the record data, attempts removes the image from S3 bucket, and on success, removes the product
// data from MongoDB.
export function RemoveRecord(props) {

    // Deconstruct the image S3 URL to find the UUID to remove from the S3 Bucket
    const UUID = props.initialValues.image.split(".com/")[1].replace(".jpg", "");

    return DeleteImage(UUID).then(() => {
        return RemoveProduct(props.initialValues.category, props.initialValues._id);
    }).catch((e) => { return e });
}
