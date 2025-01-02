import React, { useState } from 'react';
import './Add.css';
import { assets } from '../../asset/asset';
import axios from 'axios';
import { toast } from 'react-toastify';

const Add = ({url}) => {
    

    const [image, setImage] = useState(null);
    const [data, setData] = useState({
        name: "",
        description: "",
        price: "",
        category: "Cây cao cấp"
    });

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setData((prevData) => ({ ...prevData, [name]: value }));
    };

    const validateForm = () => {
        if (!data.name || !data.description || !data.price || !image) {
            toast.error("Vui lòng điền đầy đủ thông tin");
            return false;
        }
        if (isNaN(data.price) || Number(data.price) <= 0) {
            toast.error("Giá sản phẩm phải là số dương");
            return false;
        }
        return true;
    };

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        if (!validateForm()) return;

        const formData = new FormData();
        formData.append("name", data.name);
        formData.append("description", data.description);
        formData.append("price", Number(data.price));
        formData.append("category", data.category);
        formData.append("image", image);

        try {
            const response = await axios.post(`${url}/api/tree/add`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (response.data.success) {
                setData({
                    name: "",
                    description: "",
                    price: "",
                    category: "Cây cao cấp"
                });
                setImage(null);
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("Đã xảy ra lỗi khi gửi yêu cầu");
        }
    };

    return (
        <div className='add'>
            <form className='flex-col' onSubmit={onSubmitHandler}>
                <div className="add-img-upload flex-col">
                    <p>Tải ảnh lên</p>
                    <label htmlFor="image">
                        <img src={image ? URL.createObjectURL(image) : assets.upload_erea} alt="" />
                    </label>
                    <input 
                        onChange={(e) => setImage(e.target.files[0])} 
                        type="file" 
                        id="image" 
                        hidden 
                        required 
                    />
                </div>
                <div className="add-product-name flex-col">
                    <p>Tên sản phẩm</p>
                    <input 
                        onChange={onChangeHandler} 
                        value={data.name} 
                        type="text" 
                        name='name' 
                        placeholder='Điền vào đây' 
                    />
                </div>
                <div className="add-product-description flex-col">
                    <p>Thông tin sản phẩm</p>
                    <textarea 
                        onChange={onChangeHandler} 
                        value={data.description} 
                        name="description" 
                        rows="6" 
                        placeholder='Viết thông tin sản phẩm vào đây'
                    ></textarea>
                </div>
                <div className="add-category-price">
                    <div className="add-category flex-col">
                        <p>Loại sản phẩm</p>
                        <select 
                            name='category' 
                            onChange={onChangeHandler} 
                            value={data.category}
                        >
                            <option value="Cây để bàn">Cây để bàn</option>
                            <option value="Cây văn phòng">Cây văn phòng</option>
                            <option value="Cây trong nước">Cây trong nước</option>
                            <option value="Cây dễ trồng">Cây dễ trồng</option>
                            <option value="Cây phong thủy">Cây phong thủy</option>
                            <option value="Cây cao cấp">Cây cao cấp</option>
                            <option value="Chậu đất nung">Chậu đất nung</option>
                            <option value="Chậu xi măng">Chậu xi măng</option>
                        </select>
                    </div>
                    <div className="add-price flex-col">
                        <p>Giá sản phẩm</p>
                        <input 
                            onChange={onChangeHandler} 
                            value={data.price} 
                            type="number" 
                            name='price' 
                            placeholder='10000' 
                        />
                    </div>
                </div>
                <button type='submit' className='add-btn'>Thêm</button>
            </form>
        </div>
    );
};

export default Add;
