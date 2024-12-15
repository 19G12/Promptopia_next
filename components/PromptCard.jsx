import { useState} from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";

const PromptCard = ({post: data, handleTagClick, handleDelete, handleEdit}) => {
  
  const {data: session} = useSession();
  const pathName = usePathname();
  const router = useRouter();
  
  const [copied, setCopied] = useState("");  
  
  const handleCopy = async () => {
    try {
      setCopied(data.prompt);
      await navigator.clipboard.writeText(data.prompt);
      setTimeout(() => setCopied(""), 3000);
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }

  return (
    <div className="prompt_card">
      <div className="flex justify-start gap-5 items-start gap-3 cursor-pointer">
        <div>
          {data ?
            <Image
            src={data?.creator.image}
            alt="alt-image"
            width={50}
            height={50}
            className="rounded-full object-contain"
            onClick={() => router.push(`/profile?userId=${data.creator._id}`)}
          /> : <></>
          }
          
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gre-900">
              {data?.creator.username}
            </h3>
            <p className="font-inter text-sm text-grey-500">
              {data?.creator.email}
            </p>
          </div>
        </div>
        
        <div className="copy_btn">
          <Image 
            src={copied === data?.prompt ? "/assets/icons/tick.svg":"/assets/icons/copy.svg"}
            width={12}
            alt="copy-image"
            height={12}
            onClick={handleCopy}
          />
        </div>
      </div>
      
      <p className="my-2 font-satoshi text-sm">
        {data?.prompt}
      </p>
      <p className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick && handleTagClick(data?.tag)}
      >
        {data?.tag}
      </p>
      
      {session?.user.id === data.creator._id && pathName === "/profile" && 
        <div className="mt-5 flex-center gap-4 border-t border-gray-100 pt-3">
          <p className="font-inter text-sm green_gradient cursor-pointer"
            onClick={() => handleEdit && handleEdit(data)}
          >
            Edit 
          </p>
          <p className="font-inter text-sm orange_gradient cursor-pointer"
            onClick={() => handleDelete && handleDelete(data)}
          >
            Delete
          </p>
        </div>
      }
    </div>
  );
}

export default PromptCard