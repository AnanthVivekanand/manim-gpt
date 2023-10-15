"use client"


import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react';


export default function Home() {

  const [pdf, setPDF] = useState(null);
  const [html, setHTML] = useState("");
  
  const stablediffusionapi = (text : string) => {
    return fetch('/api/manim', {
      method: 'POST',
      body: JSON.stringify({
        "topic": text
      })
    })
    .then(response => response.text())
    .then(data => {
      console.log(data)
      document.getElementById("output").innerHTML = document.getElementById("output")?.innerHTML.replace("|||" + text + "|||", `<center><video controls><source src="${data}" type="video/mp4"></video></center>`)
    })
  
  }

  const processHTML = (data : string) => {
    let requests = []

    let counter = 0
    let original = ""
    for (let element of data.split("|||")) {
      if (counter % 2 == 0) {
        // original += element
      } else {
        requests.push(stablediffusionapi(element))
      }
      counter++;
    }
  }

  const uploadToClient = (event: { target: { files: any[]; }; }) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];

      var data = new FormData()
      data.append('file', i)

      setPDF(i);
      
      fetch('/api/pdf_math', {
        method: 'POST',
        body: data
      })
      .then(response => response.text())
      .then(data => {
        console.log(data);
        document.getElementById("output").innerHTML = data;
        processHTML(data);
      })
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          

      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
          Upload a PDF. We will send it to a Flask backend, and extract the HTML from it. Then we will send it back and render it below.

          <input type="file" id="file" name="file" onChange={uploadToClient} className="hidden"/>
          <label htmlFor="file" className="block p-4 m-4 text-center text-white bg-blue-500 rounded-lg cursor-pointer">Upload a PDF</label>
       
       
       </div>
       
       
       </div> 
      </div>


        
      <div id='pdf' className="relative z-10 w-full h-full p-4 overflow-auto bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <p className="text-2xl font-bold" id="output">{ html }</p>
      </div>
    </main>
  )
}
