import React, { useEffect, useState } from 'react';
import './List.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const List = ({url}) => {
    
    const [list, setList] = useState([]);
    const [loading, setLoading] = useState(true);  // Thêm state loading

    // Hàm lấy danh sách cây từ API
    const fetchList = async () => {
        try {
            const response = await axios.get(`${url}/api/tree/list`);
            if (response.data.success) {
                setList(response.data.data);  // Cập nhật danh sách cây vào state
                setLoading(false);  // Đổi trạng thái loading sau khi nhận được dữ liệu
            } else {
                console.error('Lỗi API:', response.data.message);
                setLoading(false);  // Đổi trạng thái loading ngay cả khi có lỗi
            }
        } catch (error) {
            console.error('Lỗi khi gọi API:', error);
            setLoading(false);  // Đổi trạng thái loading ngay cả khi có lỗi
        }
    };
    const removeTree = async(TreeId)=>{
        const response = await axios.post(`${url}/api/tree/remove`,{id:TreeId})
        await fetchList();
        if (response.data.success) {
            toast.success(response.data.message)
        }
        else{
            toast.error("Lỗi")
        }
    }
    // Gọi fetchList khi component được mount
    useEffect(() => {
        fetchList();
    }, []);

    // Nếu đang tải dữ liệu, hiển thị loading
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='list add flex-col'>
            <p>Tất cả cây</p>
            <div className="list-table">
                <div className="list-table-format title">
                    <b>Hình Ảnh</b>
                    <b>Tên sản phẩm</b>
                    <b>Phân loại sản phẩm</b>
                    <b>Giá</b>
                    <b>Hành động</b>
                </div>
                {list.map((item, index) => {
                    return (
                        <div key={index} className='list-table-format'>
                            <img src={`${url}/images/` + item.image} alt="" />
                            <p>{item.name}</p>
                            <p>{item.category}</p>
                            <p>{item.price}</p>
                            <p onClick={()=>removeTree(item._id)} className='cursor'>x</p>

                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default List;
