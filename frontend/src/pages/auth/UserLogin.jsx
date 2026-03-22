import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PasswordInput from '../../components/PasswordInput'
import '../../styles/form.css'

const UserLogin = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    // Add your login logic here
  }

  const handleNavigateSignup = () => {
    navigate('/user/register')
  }

  const handleFoodPartnerMode = () => {
    navigate('/food-partner/login')
  }

  return (
    <div className="container">
      <div className="form-card">
        <h2 style={{ marginBottom: "20px" }}>Welcome Back</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="user@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            {errors.email && <small style={{ color: 'var(--error)' }}>{errors.email}</small>}
          </div>

          <PasswordInput
            id="password"
            label="Password"
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            required
          />

          <div style={{ textAlign: 'right', marginBottom: '20px' }}>
            <span
              style={{
                fontSize: '13px',
                color: 'var(--primary)',
                cursor: 'pointer',
                fontWeight: '600',
                transition: 'var(--transition-fast)'
              }}
              onMouseEnter={(e) => e.target.style.textDecoration = 'underline'}
              onMouseLeave={(e) => e.target.style.textDecoration = 'none'}
            >
              Forgot password?
            </span>
          </div>

          <button type="submit" className="btn">
            Sign In
          </button>
        </form>

        <div className="divider">or continue as</div>

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
          Don't have an account?{' '}
          <span onClick={handleNavigateSignup}>Create one</span>
        </div>
      </div>
    </div>
  )
}

export default UserLogin
