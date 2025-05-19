import axios from "axios";

const url = 'https://uygulamaprojesi-87ea3-default-rtdb.firebaseio.com/'

export async function storeCourse(courseData) {
    const response = await axios.post(url + '/courses.json', courseData)
    const id = response.data.name
    return id
}

export async function getCourse(courseData) {
    const response = await axios.get(url + '/courses.json')

    const courses = [];
    for (const key in response.data) {
        const courseObj = {
            id: key,
            amount: response.data[key].amount,
            date: new Date(response.data[key].date),
            description: response.data[key].description,
        };
        courses.push(courseObj)
    }
    return courses
}
export function updateCourseHttp(id, courseData) {
    return axios.put(url + `/courses/${id}.json`, courseData)
}
export function deleteCourseHttp(id) {
    return axios.delete(url + `/courses/${id}.json`)
}