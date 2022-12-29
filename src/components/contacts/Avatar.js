import classes from './Avatar.module.css'

const Avatar = (props) => { 

  const handleOnChange = (event) => {
    props.onSelectAvatar(event.target.id)
  }

  const avatars = ['no-avatar', 'female-user', 'old-man', 'old-woman', 'user-male']

  const images = avatars.map((image, index) => {

    let default_image = props.selectedAvatar === image
    const img = require(`../../assets/avatar/${image}.png`);

      return ( <label className={`btn ${default_image ? `${classes['selected']}` : `${classes['avatar-buttons']}`}`} 
                      htmlFor={image}   
                      key={image}>

                <input type="radio" 
                      className='btn-check'
                      name='avatar'
                      id={image} autoComplete="off" 
                      checked={default_image} 
                      onChange={handleOnChange.bind(this)} /> 
                <img
                  key={image}
                  src={img}
                  className={classes['avatar-image']}
                  alt={`${image}-avatar`}
                />
              </label>
    );

  });


  // <label className={`btn ${default_image ? `${classes['selected']}` : `${classes['avatar-buttons']}`}`} htmlFor={image}   key={image}>
  
  // <input type="radio" 
  //       className="btn-check" 
  //       name={`avatar[${image}]`} 
  //       id={image} autoComplete="off" 
  //       checked={default_image} 
  //       onChange={handleOnChange.bind(this)} /> 
    // <img
    //   key={image}
    //   src={img}
    //   className={classes['avatar-image']}
    //   alt={`${image}-avatar`}
    // />
  // </label>

  
  return <div className="my-4"> 
          <label className="mb-3">Select Avatar:</label>
          <div className="text-center">
            <div className="btn-group" role="group" aria-label="avatar-choices">
              {images}
            </div>

          </div>

         </div>
}

export default Avatar;