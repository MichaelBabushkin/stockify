import  pageNotFound from "@images/404.jpg"
import Image from 'next/image'

export default function Custom404() {
    return   (

    <div className="page-not-found-container">
        <div className="page-not-found-text">I wouldn't put my money on it</div>
    <Image
    src={pageNotFound}
    width={1500}
    height={700}
    alt="Page not found"
    />
    </div>
    )
  }
