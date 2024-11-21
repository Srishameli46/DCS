import { faBriefcaseMedical } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function Call() {
  return (
    <div className="bg-sky-500 p-5 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
    <div className="flex items-center gap-3 border-b pb-3 border-slate-300">
      <FontAwesomeIcon icon={faBriefcaseMedical} className="text-gray-50 text-xl" />
      <h3 className="text-white text-xl font-semibold">EMERGENCY CALLS</h3>
    </div>
    <div className="mt-5">
      <p className="text-white text-2xl font-bold mb-3">1-800-1234-567</p>
      <p className="text-white text-lg">Call us!</p>
    </div>
  </div>
  )
}

export default Call