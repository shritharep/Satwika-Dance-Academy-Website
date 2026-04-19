import React from 'react';
import { useTranslation } from 'react-i18next';




const Home = () => {
    const { t } = useTranslation();
    const [students, setStudents] = useState([]);
    const [booking, setBooking] = useState({ name: '', classTime: '', classType: '1h', instructor: '' });
    const [bookingStatus, setBookingStatus] = useState(null);

    const loadSchedule = async () => {
        try {
            const res = await fetch('/api/students');
            if (!res.ok) return;
            const data = await res.json();
            setStudents(data);
        } catch (error) {
            console.warn('Failed to load schedule', error);
        }
    };

    useEffect(() => {
        loadSchedule();
    }, []);

    const handleBookingChange = (event) => {
        const { name, value } = event.target;
        setBooking((prev) => ({ ...prev, [name]: value }));
    };

    const handleBookingSubmit = async (event) => {
        event.preventDefault();

        try {
            const res = await fetch('/api/students', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(booking),
            });
            if (!res.ok) {
                setBookingStatus({ ok: false, message: 'Unable to book class' });
                return;
            }
            const created = await res.json();
            setBookingStatus({ ok: true, message: `Booked ${created.name} at ${created.classTime}` });
            setBooking({ name: '', classTime: '', classType: '1h', instructor: '' });
            loadSchedule();
        } catch (error) {
            setBookingStatus({ ok: false, message: 'Booking failed' });
        }
    };

    const scheduleRows = useMemo(() => {
        return students
            .slice()
            .sort((a, b) => a.classTime.localeCompare(b.classTime))
            .map((student) => (
                <tr key={student.id}>
                    <td>{student.name}</td>
                    <td>{student.classTime}</td>
                    <td>{student.classType}</td>
                    <td>{student.instructor}</td>
                </tr>
            ));
    }, [students]);

    return (
        <main>
            <section id='home' className='hero-section'>
                <div className='section-content'>
                    <div className='hero-details'>
                        <h1 className='title'>{t('home.title')}</h1>
                        <p className='description'>{t('home.description')}</p>
                        <div className='buttons'>
                            <a className='btn btn-primary' href='#offer'>Explore Our Classes</a>
                            <a className='btn btn-secondary' href='#contact'>Contact Us</a>
                        </div>
                    </div>
                </div>
            </section>

            <section id='offer' className='services-section'>
                <h2 className='section-title'>What We Offer</h2>
                <div className='section-content'>
                    <ul className='services-list'>
                        <li className='service-item'>
                            <h3 className='service-title'>1-on-1 Classes</h3>
                            <p className='service-description'>45-minute focused classes for a single student.</p>
                        </li>
                        <li className='service-item'>
                            <h3 className='service-title'>Group Classes</h3>
                            <p className='service-description'>1-hour classes for a group of students based on experience level.</p>
                        </li>
                        <li className='service-item'>
                            <h3 className='service-title'>Costume Tailoring Services</h3>
                            <p className='service-description'>Custom costume tailoring and stitching for dancers.</p>
                        </li>
                        <li className='service-item'>
                            <h3 className='service-title'>Jewelry and Makeup</h3>
                            <p className='service-description'>Rent dance jewelry and access makeup supplies and services.</p>
                        </li>
                    </ul>
                </div>
            </section>

            <section id='book' className='schedule-section'>
                <h2 className='section-title'>Book Your First Class Today</h2>
                <div className='section-content'>
                    <form className='booking-form' onSubmit={handleBookingSubmit}>
                        <label>
                            Name
                            <input
                                name='name'
                                value={booking.name}
                                onChange={handleBookingChange}
                                required
                            />
                        </label>
                        <label>
                            Preferred Time
                            <input
                                name='classTime'
                                value={booking.classTime}
                                onChange={handleBookingChange}
                                placeholder='e.g. Mon 16:00'
                                required
                            />
                        </label>
                        <label>
                            Class Length
                            <select name='classType' value={booking.classType} onChange={handleBookingChange}>
                                <option value='45m'>45 minutes</option>
                                <option value='1h'>1 hour</option>
                            </select>
                        </label>
                        <label>
                            Instructor (optional)
                            <input
                                name='instructor'
                                value={booking.instructor}
                                onChange={handleBookingChange}
                                placeholder='Leave blank for default'
                            />
                        </label>
                        <button type='submit' className='btn btn-primary'>Book Now</button>
                        {bookingStatus && (
                            <p className={bookingStatus.ok ? 'status success' : 'status error'}>
                                {bookingStatus.message}
                            </p>
                        )}
                    </form>

                    <h3 className='section-title'>Current Class Schedule</h3>
                    <table className='schedule-table'>
                        <thead>
                            <tr>
                                <th>Student</th>
                                <th>Class Time</th>
                                <th>Class Length</th>
                                <th>Instructor</th>
                            </tr>
                        </thead>
                        <tbody>{scheduleRows}</tbody>
                    </table>
                </div>
            </section>

            <section id='contact' className='contact-section'>
                <h2 className='section-title'>Contact Us</h2>
                <div className='section-content'>
                    <p>
                        You can reach us by email at{' '}
                        <a href='mailto:info@satwikaacademy.com'>info@satwikaacademy.com</a> or fill
                        the form below.
                    </p>
                    <form className='contact-form' onSubmit={(e) => e.preventDefault()}>
                        <label>
                            Your Name
                            <input name='contactName' placeholder='Your name' />
                        </label>
                        <label>
                            Your Email
                            <input name='contactEmail' type='email' placeholder='you@example.com' />
                        </label>
                        <label>
                            Message
                            <textarea name='contactMessage' placeholder='Write a message...' />
                        </label>
                        <button type='submit' className='btn btn-secondary'>Send Message</button>
                    </form>
                </div>
            </section>
        </main>
    );
};

export default Home;
