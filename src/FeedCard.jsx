import React from 'react'

const FeedCard = ({ data }) => {
    // console.log(data);
  return (
    <div className="card bg-base-300 w-90 shadow-sm">
        <figure>
          <img
            src={data.photoURL}
            alt="Shoes" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">
            {data.firstName + " " + data.lastName}
            <div className="badge badge-secondary">{data?.age}</div>
          </h2>
          <p>{data?.about}</p>
            { data?.skills?.length > 0 && (
                <div className="card-actions justify-end">Skills: 
                    {data.skills.map((skill) => (
                        <div className="badge badge-outline">{skill}</div>
                        // <div className="badge badge-outline">Products</div>
                    ))}
                </div>
            )}
            <div className="card-actions flex justify-center my-2">
                <button className="btn btn-error">Ignore</button>
                <button className="btn btn-primary">Interested</button>
            </div>
        </div>
    </div> 
  )
}

export default FeedCard