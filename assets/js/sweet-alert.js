export const showPositionSwal = (position, icon, title, confirmButtonVisible, timer) => {
    Swal.fire({
        position: position,
        icon: icon,
        title: title,
        showConfirmButton: confirmButtonVisible,
        timer: timer
    });
}