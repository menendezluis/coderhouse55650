let addCourses = document.getElementsByClassName("asignar");
console.log(addCourses);
for (let courses of addCourses) {
  courses.addEventListener("click", async (e) => {
    console.log("holaaaa");
    let cid = e.target.id;
    let response = await fetch(`/api/users/course/${cid}`, {
      method: "PUT",
    });
    let data = await response.json();
    if (data.status === "success") {
      window.location.reload();
    }
  });
}
