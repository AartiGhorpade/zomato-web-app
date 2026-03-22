import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PasswordInput from '../../components/PasswordInput'
import '../../styles/form.css'

const FoodPartnerSignup = () => {
    const [restaurantName, setRestaurantName] = useState('')
    const [ownerName, setOwnerName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [businessLicense, setBusinessLicense] = useState('')
    const [address, setAddress] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()
        // Add your signup logic here
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
                            <label htmlFor="restaurantName">Restaurant Name</label>
                            <input
                                type="text"
                                id="restaurantName"
                                placeholder="Your Restaurant"
                                value={restaurantName}
                                onChange={(e) => setRestaurantName(e.target.value)}
                                required
                            />
                            {errors.restaurantName && <small style={{ color: 'var(--error)' }}>{errors.restaurantName}</small>}
                        </div>
                        <div className="form-group">
                            <label htmlFor="ownerName">Owner Name</label>
                            <input
                                type="text"
                                id="ownerName"
                                placeholder="John Doe"
                                value={ownerName}
                                onChange={(e) => setOwnerName(e.target.value)}
                                required
                            />
                            {errors.ownerName && <small style={{ color: 'var(--error)' }}>{errors.ownerName}</small>}
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
                        <label htmlFor="address">Restaurant Address</label>
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
                        Register Restaurant
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
                    Already registered?{' '}
                    <span onClick={handleNavigateLogin}>Sign in</span>
                </div>
            </div>
        </div>
    )
}

export default FoodPartnerSignup
