import { cache } from 'react'

export const sendCreateAccountMail = cache(async (email: string, login: string, token: string) => {
	try {
		const nodemailer = await import('nodemailer')

		const transporter = nodemailer.createTransport({
			service: 'gmail',
			auth: {
				user: process.env.EMAIL,
				pass: process.env.EMAIL_PASS,
			},
		})

		await transporter.sendMail({
			from: process.env.EMAIL,
			to: email,
			subject: 'Twój link aktywacyjny do platformy quiz4u',
			html: `<!DOCTYPE html><html lang="pl"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"><title>Potwierdzenie rejestracji konta</title><style>body{background-color:#141517;color:#BBBCBF;font-family:'Arial',sans-serif;padding:20px;text-align:center;}.container{max-width:600px;margin:30px auto;padding:20px;background:#1e2023;border-radius:8px;box-shadow:0 4px 8px rgba(0,0,0,0.1);}.logo{margin-bottom:20px;}h1,.welcome{color:#ffffff;}p{margin-bottom:20px;}a.button{display:inline-block;padding:10px 20px;margin:20px 0;background-color:#5721f2;color:#ffffff;text-decoration:none;border-radius:5px;transition:background-color 0.3s ease;}a.button:hover{background-color:#6a34ff;}.footer-text{font-size:0.8em;margin-top:30px;}.ignore-message{font-size:0.8em;color:#666768;margin-top:40px;}span,p{color:#ffffff;}</style></head><body><div class="container"><div class="welcome">Cześć ${login}</div><h1>Potwierdzenie rejestracji konta w serwisie quiz4u</h1><p>Aby dokończyć rejestrację i rozpocząć naukę z quizami, prosimy o potwierdzenie adresu e-mail klikając poniższy przycisk.</p><a href="${process.env.NEXTAUTH_URL}/api/activate/${token}" class="button"><span>Potwierdź swoje konto</span></a><div class="footer-text">Życzymy miłej nauki i samych sukcesów!</div><div class="ignore-message">Jeśli nie zakładałeś/aś konta, zignoruj tę wiadomość.</div></div></body></html>
               `,
		})
	} catch (e) {
		console.log('error: ', e)
	}
})
