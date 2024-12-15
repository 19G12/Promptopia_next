import PromptCard from "./PromptCard";

const Profile = ({name, desc, data, handleEdit, handleDelete}) => {
  
  return (
    <section className='w-full'>
      <h1 className="head_text text_left">
        <span className='blue_gradient'>
          {name} Profile
        </span>
      </h1>
      <p className='desc text_left'>{desc}</p>
      
      <div className="mt-16 prompt_layer">
      {data.length === 0 ? (
        <p>Loading...</p>
      ) : (
        data.map((val) => (
          <PromptCard 
            key={val._id}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            post={val}
          />
        ))
      )}
    </div>
    </section>
  )
}

export default Profile;