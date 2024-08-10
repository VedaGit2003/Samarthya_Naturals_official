import React from 'react'
import '../css/blog.css'
import Lay from '../components/Layout/Lay'

const Blog = () => {
    return (
        <Lay>
            <div className='full'>
                <div className='background'>
                    <h1>Welcome to the blog page</h1>
                </div>
                <div className='blogs' style={{ display: 'flex', flexWrap: 'wrap',justifyContent:'space-around',margin:'4%',padding:10}}>
                    <div class="card">
                        <div class="image">
                            <img src='https://media.istockphoto.com/id/1138634879/photo/annapurna-mountain-range-reflecting-in-an-infinity-pool-in-a-resort-pokhara-nepal.webp?b=1&s=170667a&w=0&k=20&c=EW0WG_W4kh9FvRt5zc3U5JVy_vshgKi1xzz1Uk-OcEA='
                            style={{height:'100%',width:'100%'}}
                            ></img>
                        </div>
                        <div class="content">
                            <a href="#">
                                <span class="title">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                </span>
                            </a>

                            <p class="desc">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae
                                dolores, possimus pariatur animi temporibus nesciunt praesentium
                            </p>

                            <a class="action" href="#">
                                Find out more
                                <span aria-hidden="true">
                                    →
                                </span>
                            </a>
                        </div>
                    </div>
                    <div class="card">
                        <div class="image">
                            <img src='https://media.istockphoto.com/id/511593366/photo/tropical-jungle.webp?b=1&s=170667a&w=0&k=20&c=46GneXerhvicLnL5i2SS0WJdtuiXhGa7bi6ZRNeWMqw=' 
                         style={{height:'100%',width:'100%'}}

                            ></img>
                        </div>
                        <div class="content">
                            <a href="https://www.webmd.com/diet/health-benefits-moringa-powder">
                                <span class="title">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                </span>
                            </a>

                            <p class="desc">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae
                                dolores, possimus pariatur animi temporibus nesciunt praesentium
                            </p>

                            <a class="action" href="https://www.webmd.com/diet/health-benefits-moringa-powder">
                                Find out more
                                <span aria-hidden="true">
                                    →
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </Lay>
    )
}

export default Blog