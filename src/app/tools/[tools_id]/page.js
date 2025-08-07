import React from 'react'

const page = async({params}) => {
    const awaitedContent = await params;
   const toolId =awaitedContent.tools_id;

   const renderedToolContent = () => {
    switch(toolId){
        case 'resume-maker':
            return <div>This is resume maker page</div>
        case 'ats':
            return <div>This is ats page</div>
        case 'json-formatter':
            return <div>This is json formatter page</div>
        case 'seo-title-maker':
            return <div>This is seo title maker page</div>
        case 'uuid-generator':
            return <div>This is uuid generator page</div>
        case 'meta-description':
            return <div>This is meta description page</div>
        case 'regex-tester':
            return <div>This is regex tester page</div>
        case 'instagram-caption':
            return <div>This is instagram caption page</div>
        case 'jwt-decoder':
            return <div>This is jwt decoder page</div>
        case 'background-remover':
            return <div>This is background remover page</div>
        case 'ai-cover-letter':
            return <div>This is ai cover letter page</div>
        case 'youtube-classes':
            return <div>This is youtube classes page</div>
        default:
            return <div>No tool found.</div>
    }
   }

   return (
    <main className='text-white'>
        {renderedToolContent()}
    </main>
   )
}

export default page