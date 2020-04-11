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
                        <a onClick={()=>paginate(number)}  className="page-link">
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Pagination;
