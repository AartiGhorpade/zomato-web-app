import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PasswordInput from '../../components/PasswordInput'
import '../../styles/form.css'
import axios from 'axios'
import toast from 'react-hot-toast'

const FoodPartnerSignup = () => {
    const [businessname, setRestaurantName] = useState('')
    const [contactName, setContactName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [address, setAddress] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        console.log(contactName);
        
        e.preventDefault()
        axios.post('http://localhost:3000/api/foodPartner/register', {
            fullname: businessname,
            contactname: contactName,
            email,
            phone,
            address,
            password
        })
            .then((response) => {
                console.log(response.data)
                toast.success('Partner registration successful! Welcome to our platform!')
                navigate('/')
            })
            .catch((error) => {
                console.error('Error:', error)
                toast.error(error.response?.data?.message || 'Registration failed. Please try again.')
            })

    }

    const handleNavigateLogin = () => {
        navigate('/food-partner/login')
    }

    const handleUserMode = () => {
        navigate('/user/register')
    }

    return (
        <div className="container">
            <div className="form-card">
                <h2>Partner with Us</h2>
                <p className="subtitle">Register your restaurant and grow your business</p>

                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="form-group">
                            <label htmlFor="businessname">Business Name</label>
                            <input
                                type="text"
                                id="businessname"
                                placeholder="Business Name"
                                value={businessname}
                                onChange={(e) => setRestaurantName(e.target.value)}
                                required
                            />
                            {errors.businessname && <small style={{ color: 'var(--error)' }}>{errors.businessname}</small>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="contactName">Contact Name</label>
                            <input
                                type="text"
                                id="contactName"
                                placeholder="John Doe"
                                value={contactName}
                                onChange={(e) => setContactName(e.target.value)}
                                required
                            />
                            {errors.contactName && <small style={{ color: 'var(--error)' }}>{errors.contactName}</small>}
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Business Email</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="business@restaurant.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                        {errors.email && <small style={{ color: 'var(--error)' }}>{errors.email}</small>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="phone">Phone Number</label>
                        <input
                            type="tel"
                            id="phone"
                            placeholder="+1 (555) 000-0000"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                        {errors.phone && <small style={{ color: 'var(--error)' }}>{errors.phone}</small>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <textarea
                            id="address"
                            placeholder="Enter your complete address"
                            rows="2"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            style={{
                                padding: '12px 14px',
                                borderRadius: '8px',
                                border: '1.5px solid var(--border)',
                                background: 'var(--input)',
                                color: 'var(--text)',
                                fontFamily: 'inherit',
                                outline: 'none',
                                fontSize: '14px',
                                transition: 'all 0.2s ease',
                                resize: 'vertical',
                                minHeight: '80px'
                            }}
                            required
                        />
                        {errors.address && <small style={{ color: 'var(--error)' }}>{errors.address}</small>}
                    </div>

                    <div className="row" style={{ marginBottom: '20px' }}>
                        <PasswordInput
                            id="password"
                            label="Password"
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            error={errors.password}
                            required
                        />
                    </div>

                    <button type="submit" className="btn">
                        Create Partner
                    </button>
                </form>

                <div className="divider">or register as</div>

                <button
                    type="button"
                    style={{
                        width: '100%',
                        padding: '8px 16px',
                        border: '1.5px solid var(--border)',
                        borderRadius: '8px',
                        background: 'transparent',
                        color: 'var(--text)',
                        fontWeight: '600',
                        fontSize: '14px',
                        cursor: 'pointer',
                        transition: 'var(--transition-fast)',
                        marginBottom: '12px'
                    }}
                    onClick={handleUserMode}
                    onMouseEnter={(e) => {
                        e.target.style.background = 'var(--input-hover)'
                        e.target.style.borderColor = 'var(--border-light)'
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.background = 'transparent'
                        e.target.style.borderColor = 'var(--border)'
                    }}
                >
                    User
                </button>

                <div className="footer-text">
                    Already have an account?{' '}
                    <span onClick={handleNavigateLogin}>Sign in</span>
                </div>
            </div>
        </div>
    )
}

export default FoodPartnerSignup
