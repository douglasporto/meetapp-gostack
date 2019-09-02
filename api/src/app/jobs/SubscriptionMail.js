import { format, parseISO } from 'date-fns';
import us from 'date-fns/locale/en-US';
import Mail from '../../lib/Mail';

const formatDate = data => format(data, "MMMM dd', at' H'h'", { locale: us });

class SubscriptionMail {
  get key() {
    return 'SubscriptionMail';
  }

  async handle({ data }) {
    const { userName, meetapp, title, date, userSubName, userSubEmail } = data;
    await Mail.sendMail({
      to: `${meetapp.owner.name} <${meetapp.owner.email}>`,
      subject: `${userName} signed up for your Meetapp ${title}!`,
      template: 'subscription',
      context: {
        ownerName: meetapp.owner.name,
        meetappTitle: title,
        meetappDate: formatDate(parseISO(date)),
        sendDate: formatDate(new Date()),
        userSubName,
        userSubEmail,
      },
    });
  }
}

export default new SubscriptionMail();
