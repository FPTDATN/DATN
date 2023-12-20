
// re_a2cJecgb_8nKZwJMgiZMBaL6LBckgdHBH
import { Resend } from 'resend';
const resend = new Resend('re_a2cJecgb_8nKZwJMgiZMBaL6LBckgdHBH');

export const senderMail = async (to, order) => {

    let items = order.products.map((product, index) => (
        `<tr key="${index}">
        <td style="border:1px solid #ccc; padding:6px 12px;">
            <img width="60" height="60" src="${product.images[0]}" alt="${product.name}"/>
        </td>
        <td style="border:1px solid #ccc; padding:6px 12px;">
            ${product.name} x <b>${product.quantity}</b>
        </td>
        <td style="border:1px solid #ccc; padding:6px 12px;">
            ${product.color}
        </td>
        <td style="border:1px solid #ccc; padding:6px 12px;">
            ${product.size}
        </td>
        <td style="border:1px solid #ccc; padding:6px 12px;">
            ${product.price * product.quantity} VND
        </td>
    </tr>`
    ))


    try {
        const data = await resend.emails.send({
            from: 'Shop A-shirt <onboarding@resend.dev>',
            to,
            subject: 'Shop A-Shirt thanks you very much',
            html: `
                        <section>
                            <div>
                                <div>
                                    <p>
                                        <b>Hóa đơn</b> : #${order.orderNumber}
                                    </p>
                                    <p>
                                        <b>Ngày tạo </b>: ${order?.createdAt?.toLocaleDateString()}
                                    </p>
                                    <p>
                                        <b>Tên khách hàng </b>: ${order.fullName}
                                    </p>
                                    <p>
                                        <b>Địa chỉ </b>: ${order.shipping}
                                    </p>
                                    <p>
                                        <b>Số điện thoại </b>: 0${order.phone}
                                    </p>
                                </div>

                                <br />

                                <div>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th style="border:1px solid #ccc; padding: 6px 12px;"></th>
                                                <th style="border:1px solid #ccc; padding: 6px 12px;">
                                                    Sản phẩm
                                                </th>
                                                <th style="border:1px solid #ccc; padding: 6px 12px;">Màu</th>
                                                <th style="border:1px solid #ccc; padding: 6px 12px;">Size</th>
                                                <th style="border:1px solid #ccc; padding: 6px 12px;">Giá</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            ${items}
                                        </tbody>
                                    </table>

                                    <br />

                                    <div>
                                        <div>
                                            <table>
                                                <tbody>
                                                    <tr>
                                                        <td>Tổng giá:</td>
                                                        <b>${order.total} VND</b>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>

                                <br />

                                <div>
                                    <b>
                                        <h2>Thank you, happy shopping again</h2>
                                    </b>
                                </div>
                            </div>
                        </section>
            `,
        });


    } catch (error) {
        console.error(error);
    }
};