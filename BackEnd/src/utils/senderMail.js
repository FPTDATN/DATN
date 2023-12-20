
// re_a2cJecgb_8nKZwJMgiZMBaL6LBckgdHBH
import { Resend } from 'resend';
const resend = new Resend('re_a2cJecgb_8nKZwJMgiZMBaL6LBckgdHBH');

export const senderMail = async (to, orderItems) => {

    let items = orderItems.map((product, index) => (
        `<li key={${index}} style="display: flex; align-items: center;">
            <img width="60" height="60" src=${product.images[0]} alt="${product.name}"/>
            <p style="margin-left:6px; font-weight:bold;">${product.name} - Size: ${product.size} - Màu: ${product.color}</p>
        </li>`
    ))


    try {
        const data = await resend.emails.send({
            from: 'Shop Ashirt <onboarding@resend.dev>',
            to,
            subject: 'Shop AShirt thanks you very much',
            html: `
            <h1 style="margin-bottom: 10px">Shop A-Shirt chân thành cảm ơn quý khách đã ủng hộ</h1>
            <h3>Sản phẩm đặt mua</h3>
            <ul>
                ${items}
            </ul>
            `,
        });

        console.log(data);
    } catch (error) {
        console.error(error);
    }
};