/**
 * Email send to confirm email address when registration
 * @param email
 * @param token
 * @returns {{Destination: {ToAddresses: [*]}, Message: {Body: {Html: {Charset: string, Data: string}}, Subject: {Charset: string, Data: string}}, ReplyToAddresses: [string | undefined], Source}}
 */
exports.registerEmailParams = (email, token) => {
  return {
    Source: process.env.EMAIL_FROM,
    Destination: {
      ToAddresses: [email]
    },
    ReplyToAddresses: [process.env.EMAIL_TO],
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data:
            `<html>
              <h1>Verify your email address</h1>
              <p>Please use the following link to complete your registration: </p>
              <p>${process.env.CLIENT_URL}/auth/activate/${token}</p>
             </html>`
        }
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'Complete your registration'
      }
    }
  };
}


/**
 * Email send to users when forgot password
 * @param email
 * @param token
 * @returns {{Destination: {ToAddresses: [*]}, Message: {Body: {Html: {Charset: string, Data: string}}, Subject: {Charset: string, Data: string}}, ReplyToAddresses: [string | undefined], Source}}
 */
exports.forgotPasswordEmailParams = (email, token) => {
  return {
    Source: process.env.EMAIL_FROM,
    Destination: {
      ToAddresses: [email]
    },
    ReplyToAddresses: [process.env.EMAIL_TO],
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data:
            `<html>
              <h1>Reset Password Link</h1>
              <p>Please use the following link to reset your password: </p>
              <p>${process.env.CLIENT_URL}/auth/password/reset/${token}</p>
             </html>`
        }
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'Reset your password'
      }
    }
  };
}

/**
 * Emails send to users in the category when new links are published
 * @param email
 * @param data
 * @returns {{Destination: {ToAddresses: [*]}, Message: {Body: {Html: {Charset: string, Data: string}}, Subject: {Charset: string, Data: string}}, ReplyToAddresses: [string | undefined], Source}}
 */
exports.linkPublishParams = (email, data) => {
  return {
    Source: process.env.EMAIL_FROM,
    Destination: {
      ToAddresses: [email]
    },
    ReplyToAddresses: [process.env.EMAIL_TO],
    Message: {
      Body: {
        Html: {
          Charset: 'UTF-8',
          Data:
            `<html>
              <h1>New link published | ReactNodeAws.com</h1>
              <p>A new link titled <b>${data.title}</b> has been just published in the following categories.</p>
              
              ${data.categories.map(c => {
              return `
                <div>
                <h2>${c.name}</h2>
                <img src="${c.image.url}" alt="${c.name}" style="height: 50px;"/>
                <h3><a href="${process.env.CLIENT_URL}/links/${c.slug}">Check it out!</a></h3>
                </div>`
            }).join('------------------------------------------')}
              <br />
                <p>Do not wish to receive notifications?</p>
                <p>Turn off notification by going to your <b>dashboard</b> > <b>update profile</b> and <b>uncheck the categories</b></p>
                <p>${process.env.CLIENT_URL}/user/profile/update</p>
              </html>`
        }
      },
      Subject: {
        Charset: 'UTF-8',
        Data: 'New link published'
      }
    }
  };
}