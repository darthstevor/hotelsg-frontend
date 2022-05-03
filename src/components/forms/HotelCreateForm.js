import MapboxAutocomplete from "react-mapbox-autocomplete";
import IconButton from "@material-ui/core/IconButton";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import {DatePicker, Select} from 'antd';
import moment from 'moment';

const { Option } = Select;

const config = {
    //appId: process.env.REACT_APP_ALGOLIA_APP_ID,
    token: process.env.REACT_APP_MAPBOX_API_TOKEN
    //language: "en",
    //countries: ["fr"]
};

const HotelCreateForm = ({values, setValues, handleChange, handleImageChange, handleSubmit, location}) => {

    const {title, content, price} = values;

     function _suggestionSelect(result, lat, long, text) {
         setValues({...values, location: result});
       };

    return (
            <form onSubmit={handleSubmit}>
            <div className='form-group'>
                <label className='btn btn-outline-secondary btn-block m-2 text-left'>       
                    Image             
                    <input type="file" name="image" onChange={handleImageChange} accept="image/*" hidden></input>
                </label>
                <input 
                    type="text" 
                    name="title" 
                    onChange={handleChange} 
                    placeholder="Title" 
                    className="form-control m-2" 
                    value={title}>
                </input>
                <textarea 
                    name="content" 
                    onChange={handleChange} 
                    placeholder="Content" 
                    className="form-control m-2" 
                    value={content}>
                </textarea>

 
                <div className="d-flex flex-row bd-highlight">
                    <IconButton sx={{ p: "10px" }} aria-label="menu" display="flex" flexDirection="row">
                        <LocationOnIcon />
                    </IconButton>
                
                    <div className="w-100">
                        <MapboxAutocomplete
                            name="location"
                            placeholder="location"
                            value={location}
                            publicKey={config.token}
                            inputClass="form-control search m-2"
                            onSuggestionSelect={_suggestionSelect}
                            resetSearch={false}
                        />
                </div>

               
                </div>

                
                

                <input 
                    type="number" 
                    name="price" 
                    onChange={handleChange} 
                    placeholder="Price" 
                    className="form-control m-2" 
                    value={price}>
                </input> 

                <Select onChange={(value) => setValues({...values, bed: value})} 
                        className="w-100 m-2"
                        size="large"
                        placeholder="Number of Beds">
                    <Option key={1}>{1}</Option>
                    <Option key={2}>{2}</Option>
                    <Option key={3}>{3}</Option>
                    <Option key={4}>{4}</Option>
                </Select>

                <DatePicker 
                    placeholder="From date" 
                    className="form-control m-2" 
                    onChange={(date, dateString) => setValues({...values, from: dateString})}
                    disabledDate={(current) => current && current.valueOf() < moment().subtract(1, 'days')}
                />

                <DatePicker 
                    placeholder="To date" 
                    className="form-control m-2" 
                    onChange={(date, dateString) => setValues({...values, to: dateString})}
                    disabledDate={(current) => current && current.valueOf() < moment().subtract(1, 'days')}
                />              


                <button className='btn btn-outline-primary m-2'>
                    Save
                </button>
            </div>
        </form>
    );    
};

export default HotelCreateForm;