import React, {useState} from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from "@material-ui/core/MenuItem";
import TextField from "@material-ui/core/TextField";
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useFormik } from "formik";
import LinearProgress from '@material-ui/core/LinearProgress';
import styles from './styles.module.css';
import ImageUpload from "./imageUpload";
import { CreateRecord, EditRecord, RemoveRecord } from './constructor'

// SubmitData takes the form-values, formats the data, and sends it to the API queries.
function SubmitData(values, props) {
    switch (props.formFunction) {
        case 'Create':
            return CreateRecord(values);
        case 'Edit':
            return EditRecord(values, props);
        default:
            return new Promise((resolve, reject) => { reject() })
    }
}

// ProductForm is the input form shown to admin users, which they can use to add data to the database
const ProductForm = (props) => {

    const [nameErr, setNameErr] = useState(false);
    const [priceErr, setPriceErr] = useState(false);
    const [descriptionErr, setDescriptionErr] = useState(false);
    const [imageErr, setImageErr] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            productID: props.initialValues._id,
            productCategory: props.initialValues.category,
            productName: props.initialValues.name,
            productPrice: props.initialValues.price,
            productDescription: props.initialValues.description,
            productVisible: props.initialValues.visible,
            productImage: props.initialValues.image,
        },

        onSubmit: values => {
            let formError = false;

            setNameErr(false);
            setPriceErr(false);
            setDescriptionErr(false);
            setImageErr(false);

            if (values.productName.length === 0) {
                setNameErr(true);
                formError = true;
            }
            if (values.productPrice.length === 0) {
                setPriceErr(true);
                formError = true;
            }
            if (values.productDescription.length === 0) {
                setDescriptionErr(true);
                formError = true;
            }
            if (values.productImage.length === 0) {
                setImageErr(true);
                formError = true;
            }

            // If no errors are present in the form, submit data
            if (!formError) {
                setIsLoading(true);
                SubmitData(values, props)
                    .then(() => {
                        setIsLoading(false);
                        props.onSubmit({ status: 'success', message: 'Successfully Added Product!', open: true })
                        props.onClose();
                    }).catch((err) => {
                    setIsLoading(false);
                    props.onSubmit({ status: 'success', message: 'Unable to Add Product...', open: true })
                })
            }
        }
    });

    return (
        <>
            <form encType="multipart/form-data" onSubmit={formik.handleSubmit}>

                <div className={styles.image_container}>
                    <ImageUpload
                        imageData={formik.values.productImage}
                        handleChange={(data) => {
                            formik.setFieldValue('productImage', data);
                        }}
                    />
                </div>

                <div className={styles.info_container}>
                    <TextField
                        select
                        id="productCategory"
                        name="productCategory"
                        label="Product Category"
                        variant="outlined"
                        onChange={formik.handleChange}
                        value={formik.values.productCategory}
                        fullWidth={true}
                        disabled={isLoading || props.formFunction === 'Edit' }
                        style={{ margin: '10px 0 10px 0' }}
                    >
                        <MenuItem value={"coffee"} style={{ padding: 20 }}>Coffee</MenuItem>
                        <MenuItem value={"treats"} style={{ padding: 20 }}>Treats</MenuItem>
                        <MenuItem value={"cakes"} style={{ padding: 20 }}>Cakes</MenuItem>
                    </TextField>

                    <TextField
                        id="productName"
                        name="productName"
                        label="Product Name"
                        variant="outlined"
                        type="text"
                        onChange={formik.handleChange}
                        value={formik.values.productName}
                        fullWidth={true}
                        disabled={isLoading}
                        style={{ margin: '10px 0 10px 0' }}
                        error={nameErr}
                        helperText={nameErr ? "Product name must be present" : ''}
                    />

                    <TextField
                        id="productPrice"
                        name="productPrice"
                        label="Product Price"
                        variant="outlined"
                        onChange={formik.handleChange}
                        disabled={isLoading}
                        value={formik.values.productPrice}
                        fullWidth={true}
                        style={{ margin: '10px 0 10px 0' }}
                        InputProps={{
                            startAdornment: <InputAdornment position="start">£</InputAdornment>,
                        }}
                        error={priceErr}
                        helperText={priceErr ? "Product price must be present" : ''}
                    />

                    <TextField
                        id="productDescription"
                        name="productDescription"
                        label="Product Description"
                        variant="outlined"
                        type="text"
                        multiline={true}
                        rows={4}
                        onChange={formik.handleChange}
                        value={formik.values.productDescription}
                        fullWidth={true}
                        disabled={isLoading}
                        style={{ margin: '10px 0 10px 0' }}
                        error={descriptionErr}
                        helperText={descriptionErr ? "Product description must be present" : ''}
                    />

                    <FormLabel
                        style={{ width: '100%', marginTop: '20px' }}
                        component="legend"
                        disabled={isLoading}
                    >
                        Show Product on Website?
                    </FormLabel>
                    <FormGroup >
                        <FormControlLabel
                            control={
                                <Checkbox
                                    disabled={isLoading}
                                    checked={formik.values.productVisible}
                                    onChange={(e) => {
                                        formik.setFieldValue('productVisible', e.target.checked)
                                    }}
                                />
                            }
                            label="Product Visible"
                        />

                        <div style={ isLoading ? {} : { display: 'none' } }>
                            <LinearProgress className={styles.linear_loading}/>
                            <p className={styles.loading_text} >
                                Large image files may take a few minutes to process...
                            </p>
                        </div>

                        <Button
                            style={{ margin: '40px 0' }}
                            fullWidth={true}
                            variant="outlined"
                            type="submit"
                            disabled={isLoading}
                        >{`Submit`}</Button>

                        <Button
                            fullWidth={true}
                            variant="outlined"
                            style={{
                                color: '#A71D00',
                                borderColor: '#A71D00',
                                display: props.formFunction === 'Edit' ? '' : 'none'
                            }}
                            disabled={isLoading}
                            onClick={() => {
                                setIsLoading(true);
                                RemoveRecord(props).then(() => {
                                    setIsLoading(false);
                                    props.onSubmit({ status: 'success', message: 'Successfully Deleted Product!', open: true })
                                    props.onClose();
                                }).catch(() => {
                                    setIsLoading(false);
                                    props.onSubmit({ status: 'error', message: 'Unable to Delete Product...', open: true })
                                    props.onClose();
                                })
                            }}
                        >{`Delete Product`}</Button>

                    </FormGroup>

                </div>

            </form>
        </>
    );
}

export default (ProductForm);

ProductForm.propTypes = {
    onClose: PropTypes.func.isRequired,
    formFunction: PropTypes.string.isRequired,
    initialValues: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
};
