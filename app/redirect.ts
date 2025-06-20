import { redirect } from "next/navigation"

export const redirector = (userType: string) => {
    if (userType === 'Librarian') {
        redirect('/g/schools/dashboard');
    } else if (userType === 'Member') {
        redirect('/members');
    } else if (userType === 'Institution') {
        redirect('/d/admin');
    } else if (userType === 'System Admin') {
        redirect('/d/gg');
    } else {
        redirect('/login?redirectFailed=1');
    }
}