import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PasswordInput from '../../components/PasswordInput'
import '../../styles/form.css'
import axios from 'axios'
import toast from 'react-hot-toast'

const UserSignup = () => {
    const [fullname, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')
    const [errors, setErrors] = useState({})
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        axios.post('http://localhost:3000/api/user/register', {
            fullname,
            email,
            phone,
            password
        }, {
            withCredentials: true
        }).then((res) => {
            console.log(res.data)
            toast.success('Account created successfully! Welcome!')
            navigate('/')
        }).catch((err) => {
            console.log(err);
            toast.error(err.response?.data?.message || 'Registration failed. Please try again.')

        })

    }

    const handleNavigateLogin = () => {
        navigate('/user/login')
    }

    const handleFoodPartnerMode = () => {
        navigate('/food-partner/register')
    }

    return (
        <div className="container">
            <div className="form-card">

                <h2 style={{ marginBottom: "16px" }}>Create user account</h2>

                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="form-group">
                            <label htmlFor="fullname">Full Name</label>
                            <input
                                type="text"
                                id="fullname"
                                placeholder="John"
                                value={fullname}
                                onChange={(e) => setFullName(e.target.value)}
                                required
                            />
                            {errors.fullname && <small style={{ color: 'var(--error)' }}>{errors.fullname}</small>}
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            placeholder="john@example.com"
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
                            placeholder="1234568754"
                            value={phone}
                            maxLength={10}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                        {errors.phone && <small style={{ color: 'var(--error)' }}>{errors.phone}</small>}
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
                        Create Account
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
                    onClick={handleFoodPartnerMode}
                    onMouseEnter={(e) => {
                        e.target.style.background = 'var(--input-hover)'
                        e.target.style.borderColor = 'var(--border-light)'
                    }}
                    onMouseLeave={(e) => {
                        e.target.style.background = 'transparent'
                        e.target.style.borderColor = 'var(--border)'
                    }}
                >
                    Food Partner
                </button>

                <div className="footer-text">
                    Already have an account?{' '}
                    <span onClick={handleNavigateLogin}>Sign in</span>
                </div>
            </div>
        </div>
    )
}

export default UserSignup
