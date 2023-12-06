import styles from '@/styles/Home.module.css'
import { useState, ChangeEvent, FormEvent, MouseEvent } from "react"
import { useRouter } from 'next/router'
import axios from 'axios'

const CreatePost = () => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const router = useRouter()

  const handleEvent = async (e: FormEvent) => {
    e.preventDefault()

    try {
      const response = await axios.post("http://localhost:3001/api/v1/posts", {
        title,
        content,
      })
      router.push("/")
    } catch (err) {
      alert("投稿に失敗しました")
    }
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>ブログ新規登録</h1>
      <form className={styles.form}>
        <label className={styles.label}>タイトル</label>
        <input
          type="text"
          className={styles.input}
          value={title}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setTitle(e.target.value)
          }
        />
        <label className={styles.label}>本文</label>
        <textarea
          className={styles.textarea}
          value={content}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
            setContent(e.target.value)
          }
        />
        <button
          type="submit"
          className={styles.button}
          onClick={(e: MouseEvent<HTMLButtonElement>) => handleEvent(e)}
        >
          投稿
        </button>
      </form>
    </div>
  )
}

export default CreatePost