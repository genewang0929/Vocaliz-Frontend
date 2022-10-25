import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import LoginPage from './login'
import { getCookie, getCookies } from "typescript-cookie";
import CategoryPage from './category'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

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
