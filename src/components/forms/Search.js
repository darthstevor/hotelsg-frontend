import React, { useState } from 'react';
import { DatePicker, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import moment from 'moment';
import MapboxAutocomplete from "react-mapbox-autocomplete";
import {useHistory} from 'react-router-dom';
import IconButton from "@material-ui/core/IconButton";
import LocationOnIcon from "@material-ui/icons/LocationOn";

// Destructure values from ant components
const {RangePicker} = DatePicker;
const {Option} = Select;


const config = {
    //appId: process.env.REACT_APP_ALGOLIA_APP_ID,
    token: process.env.REACT_APP_MAPBOX_API_TOKEN
    //language: "en",
    //countries: ["fr"]
};

const Search = (values, setValues) => {
    // State
    const [location, setLocation] = useState('');
    const [date, setDate] = useState('');
    const [bed, setBed] = useState('');

    function _suggestionSelect(result) {
        console.log("********************", result);
        setLocation(result);
        //setValues({...values, location: result});
      };
          

    // Route
    const history = useHistory();

    const handleSubmit = () => {
        history.push(`/search-result?location=${location}&date=${date}&bed=${bed}`)
    };
   
    return(
        <div className='d-flex pb-4'>
            <IconButton sx={{ p: "10px" }} aria-label="menu" display="flex" flexDirection="row">
                        <LocationOnIcon />
            </IconButton>
            <div className='w-100'>
                <MapboxAutocomplete
                    name="location"
                    placeholder="location"
                    value={location}
                    defaultValue={location}
                    publicKey={config.token}
                    inputClass="form-control search"
                    onSuggestionSelect={_suggestionSelect}
                    resetSearch={false}
                />
            </div>
            
            <RangePicker onChange={(value, dateString) => setDate(dateString)} 
            disabledDate={(current) => current & current.valueOf() < moment().subtract(1, "days")
            } className='w-100'/>
            
            <Select onChange={(value) => setBed(value)} className="w-100" size="large" placeholder="Number of Beds">
                <Option key={1}>{1}</Option>
                <Option key={2}>{2}</Option>
                <Option key={3}>{3}</Option>
                <Option key={4}>{4}</Option>
            </Select>
            <SearchOutlined onClick={handleSubmit} className="btn btn-primary p-3 btn-square" />
            
        </div>
    )
};

export default Search;