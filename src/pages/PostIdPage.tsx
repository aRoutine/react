import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import PostService from "../components/API/PostService"
import useFatching from "../components/hooks/useFatching"
import Loader from "../components/UI/Loader/Loader"


const PostIdPage = () => {
    const params = useParams()
    const [post, setPost] = useState({});
    const [comments, setComments] = useState([])
    const [fatchPostById, isLoading, error] = useFatching(async (id) => {
        const response = await PostService.getById(id)
        console.log(response)
        setPost(response.data)
    })

    const [fatchComByPostId, isComLoading, comError] = useFatching(async (id) => {
        const response = await PostService.getComByPostId(id)
        console.log(response.data)
        setComments(response.data)
    })

    useEffect(() => {
        console.log("params.id =", params.id);
        fatchPostById(params.id)
    }, [])

    useEffect(() => {
        fatchComByPostId(params.id)
    }, [])

    return (
        <div>
            <h1>Вы попали на страницу поста ID = {params.id}</h1>
            {isLoading
            ? <Loader/>
            : <div>{post.id}. {post.title}</div>
            }
            <h1>Comments</h1>
            {isComLoading 
            ? <Loader/>
            :  <h2>{comments.map((comment) => {
                return (<div style={{padding: 15, border: '1px solid blue',marginTop: 15}} key={comment.id}><h4>{comment.email}.</h4> <h5>{comment.name}:</h5><div>
                    {comment.body} 
                </div>
                
                </div>)
            })}</h2>
            }
           
            
        </div>
        
    )
}

export default PostIdPage