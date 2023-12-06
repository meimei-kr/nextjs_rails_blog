import { useRouter } from "next/router"
import { useState, ChangeEvent, FormEvent } from "react"
import axios from "axios"
import styles from "@/styles/Home.module.css"

interface Post {
  id: string
  title: string
  content: string
}

type Props = {
  post: Post
}

export async function getServerSideProps(context: any) {
  const { id } = context.params
  const res = await fetch(`http://localhost:3001/api/v1/posts/${id}`)
  const post = await res.json()

  return {
    props: {
      post,
    },
  }
}

const EditPost = ({ post }: Props) => {
  const [title, setTitle] = useState(post.title)
  const [content, setContent] = useState(post.content)
  const router = useRouter()

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setTitle(e.target.value)
  }

  const handleContentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault()
    setContent(e.target.value)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    try {
      const response = await axios.put(
        `http://localhost:3001/api/v1/posts/${post.id}`,
        {
          title,
          content,
        },
      )
      if (response.status === 200) {
        router.push("/")
      } else {
        alert("Error updating post")
      }
    } catch (err) {
      alert("Error updating post")
      console.error(err)
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>ブログ編集</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>Title:</label>
        <input
          className={styles.input}
          type="text"
          value={title}
          onChange={handleTitleChange}
        />
        <label className={styles.label}>Content:</label>
        <textarea
          className={styles.textarea}
          value={content}
          onChange={handleContentChange}
        />
        <button className={styles.button} type="submit">
          Update
        </button>
      </form>
    </div>
  )
}

export default EditPost
