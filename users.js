const BASE_URL = 'http://localhost:8000'

window.onload = async() => {
    await loadData()
};

const loadData = async() => {
    console.log('documents page loaded')
    
    const response = await axios.get(`${BASE_URL}/documents`)

    console.log(response.data)

    const userDOM = document.getElementById('documents')
    

    let htmlData = `
    <table border="1">
        <thead>
            <tr>
              <th>ID</th>
              <th>Firstname</th>
              <th>Lastname</th>
              <th>Age</th>
              <th>Gender</th>
              <th>document</th>
              <th>note</th>
              <th>Action</th>
            </tr>
        </thead>
        <tbody>
    `;
    /* ปุ่ม "Delete" มี class="delete" และเก็บค่า id ไว้ใน data-id ถูกใช้งานภายหลัง และ ลบข้อมูลของผู้ใช้*/
    //ลิ้งไปที่ index.html พร้อม id  ปุ่ม Edit ใน a คลิกแล้วจะไปหน้า index.html
    /*ขึ้นบรรทัดใหม่ ใช้ br*/
    //<button class='extra1'> Pass 1</button> สร้างปุ่ม Pass 1
    for(let i = 0; i < response.data.length; i++) {
        let documents = response.data[i]
        htmlData += `
        <tr>
          <td>${documents.id}</td>
          <td>${documents.firstname}</td>
          <td>${documents.lastname}</td>
          <td>${documents.age}</td>
          <td>${documents.gender}</td>
          <td>${documents.document|| '-'}</td>
          <td>${documents.note || '-'}</td>
          <td>
              <a href='index.html?id=${documents.id}'><button>Edit</button></a> 
              <button class='delete' data-id='${documents.id}'>Delete</button> 
              <br> 
              <button class='extra1'> Pass 1</button>
              <button class='extra2'> Notpass 2</button>
          </td>
        </tr>
        `
    } 
    htmlData += '</tbody></table>'
    userDOM.innerHTML = htmlData

    // Event สำหรับลบ user
    const deletDOMs = document.getElementsByClassName('delete')
    for(let i = 0; i < deletDOMs.length; i++) {
        deletDOMs[i].addEventListener('click', async (event) => {
            const id = event.target.dataset.id
            try{
                await axios.delete(`${BASE_URL}/documents/${id}`)
                loadData() // โหลดข้อมูลใหม่
            }catch(error){
                console.log('error', error)
            }
        })    
    }
}
