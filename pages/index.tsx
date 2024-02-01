import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { getCookies, getCookie } from 'typescript-cookie'
import styles from '../styles/Home.module.css'
import LoginPage from './login'
import CategoryPage from './category'

const Home: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    if (getCookies() === null || getCookie('email') == undefined || getCookie('email') == null)
      router.push('/login');
    else
      router.push('/category');
  }, [])

  return (
    <div></div>
  )
}

export default Home
