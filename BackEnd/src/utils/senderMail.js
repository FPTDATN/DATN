
// re_a2cJecgb_8nKZwJMgiZMBaL6LBckgdHBH
import { Resend } from 'resend';
const resend = new Resend('re_a2cJecgb_8nKZwJMgiZMBaL6LBckgdHBH');

export const senderMail = async (to, order) => {

    


    try {
        const data = await resend.emails.send({
            from: 'Shop A-shirt <onboarding@resend.dev>',
            to,
            subject: 'Shop A-Shirt thanks you very much',
            html: `
                        
            `,
        });


    } catch (error) {
        console.error(error);
    }
};