import React from 'react'


const Pagination = ({itemPerPage, totalItem, paginate}) => {
    const pageNumber=[];
    for(let i = 1; i < Math.ceil(totalItem/itemPerPage); i++) {
        pageNumber.push(i);
    }
    return (
        <div>
            <ul className="pagination">
                {pageNumber.map(number => (
                    <li key={number} className="page-item">
                        <button onClick={()=>paginate(number)}  className="page-link">
                            {number}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Pagination;
