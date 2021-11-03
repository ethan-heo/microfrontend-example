import React from 'react'

const PageA = React.lazy(() => import("pageA/PageA"))

function App() {
    return (
        <>Hello world 
            <React.Suspense fallback="Loading PageA">
                <PageA />
            </React.Suspense>
        </>
    )
}

export default App
