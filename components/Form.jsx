import Link from "next/link"

const Form = ({type, post, setPost , submitting, handleSubmit }) => {
  return (
    <section className='w-full max-w-full flex flex-col justify-start'>
      <h1 className="head_text text-left">
        <span className='blue_gradient'> {type} Post</span>
      </h1>
      <p className='desc max-w-md text-left'>
        {type} and share amazing prompts with the world, and let your 
        imagination run with any AI-powered platform
      </p>
      <form onSubmit={handleSubmit}
      className='mt-10 w-full max-w-2xl flex flex-col gap-7 glassmorphism'>
        <label>
          <span className='font-satoshi text-grey-700 font-semibold	text-base'>
            Your AI prompt
          </span>
          <textarea value={post.prompt} 
          onChange={(e) => setPost({...post,
            prompt: e.target.value
          })} 
          placeholder='Write your prompt here...'
          required
          className='form_textarea'
          />
        </label>
        <label>
          <span className='font-satoshi text-grey-700 font-semibold	text-base'>
            Tag {" "}
            <span>(#webdev, #fitness, #product, #..)</span>
          </span>
          <input value={post.tag} 
          onChange={(e) => setPost({...post,
            tag: e.target.value
          })} 
          placeholder='#tag'
          required
          className='form_input'
          />
        </label>
        <div className='flex-end mx-3 mb-5 gap-4'>
          <Link href='/' className='text-grey-500 text-sm'>
            Cancel
          </Link>
          <button type='submit' disabled={submitting} className="px-5 text-sm py-1.5 bg-primary-orange text-white rounded-full">
          {submitting ? `${type}...`: `${type}`}
          </button>
        </div>
      </form>
    </section>
  )
}

export default Form