import { getCliClient } from 'sanity/cli'

const client = getCliClient()

async function deleteProject(projectTitle: string) {
    console.log(`Searching for project to delete: "${projectTitle}"...`)
    const query = `*[_type == "project" && title == "${projectTitle}"][0]._id`
    const projectId = await client.fetch(query)

    if (projectId) {
        console.log(`Found project ID: ${projectId}. Deleting...`)
        await client.delete(projectId)
        console.log(`Successfully deleted "${projectTitle}"`)
    } else {
        console.log(`Project "${projectTitle}" not found.`)
    }
}

deleteProject("D2 Tea Lab")
