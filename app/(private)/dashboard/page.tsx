'use client';

import { Plus } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

import { Button, Input, Modal, Sidebar } from '@/components/shared';

export default function DashboardAnalytics() {
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className='container mx-auto'>
      DashboardAnalytics
      <button onClick={() => toast.info('My first toast')}>
        Give me a toast
      </button>
      <div>
        <Button
          rightIcon={<Plus className='w-5 h-5' />}
          onClick={() => setOpen(true)}
        >
          Click here
        </Button>
        <Button
          rightIcon={<Plus className='w-5 h-5' />}
          onClick={() => setIsOpen(true)}
        >
          Click modal
        </Button>
      </div>
      <Input label='Email Address' type='email' placeholder='you@example.com' />
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eaque quas
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reiciendis, ea
        numquam totam ipsa at delectus mollitia, ullam, autem cupiditate
        dignissimos nam sit neque eveniet esse officia fuga molestiae fugit!
        Esse at dolore reiciendis error iusto voluptas consectetur fugit qui,
        nostrum repellat maxime sunt, iure odio nulla hic ducimus quibusdam quis
        quasi, a iste facere in non obcaecati architecto? Quisquam itaque
        labore, esse ut alias totam consequatur vitae atque. Harum inventore
        voluptate mollitia rem corporis eum aperiam excepturi! Voluptatem atque
        nostrum aspernatur incidunt, eum, tempore fugit placeat vel modi eius
        recusandae ut obcaecati porro numquam iure ullam, ex distinctio eveniet
        natus cupiditate error quos quas ipsum reiciendis! Dolores explicabo hic
        facere ea ad quaerat autem aliquam sapiente voluptates blanditiis
        officiis reiciendis maiores doloremque, corrupti omnis veritatis
        cupiditate labore. Perferendis delectus, sequi recusandae sunt eaque
        impedit porro iusto voluptates quos minima omnis debitis est architecto.
        Cum veniam ipsa quia aliquam itaque tempora architecto quam totam
        suscipit necessitatibus sed, quis expedita voluptate numquam quas
        reprehenderit eveniet eligendi nostrum maxime, ducimus nam asperiores
        dolor assumenda dicta! Voluptatibus saepe nesciunt hic autem praesentium
        aut harum, ipsam voluptatum eius. Laborum in voluptate sint voluptatum
        tenetur quis cum quibusdam omnis numquam tempora, recusandae suscipit
        pariatur ratione, libero eos ullam quaerat doloremque optio itaque
        consequatur. Nemo eveniet sunt velit veritatis cupiditate, nam ducimus?
        Debitis dolore amet modi, asperiores exercitationem molestias earum, eos
        a, mollitia in ipsa. Laudantium similique veniam harum possimus eaque
        quod hic nesciunt doloremque provident doloribus earum dolorem corporis
        alias, modi consequatur voluptatibus rerum est ad minima omnis placeat
        libero! Fuga totam, veritatis provident neque sint deserunt blanditiis
        reprehenderit cupiditate nam omnis dolores eaque quisquam numquam
        possimus, enim eum alias dolore sequi? Autem quisquam eos, perspiciatis
        rerum repellendus dicta unde, ratione voluptate nesciunt deserunt iste
        hic consectetur accusantium? Laudantium nisi, voluptas tenetur iure
        molestias sed! Veniam tempora dolores asperiores quae perferendis
        similique, cum nesciunt iure id assumenda, praesentium error. Ad eius
        consequuntur commodi cum tempore accusantium sunt molestias autem
        aperiam error magnam voluptatem eaque illum, architecto explicabo
        temporibus vero dicta aspernatur adipisci, mollitia placeat unde, ipsum
        in deserunt? Ut iusto, placeat animi minus numquam velit omnis
        accusamus? Neque iusto mollitia alias aliquid ad vitae enim voluptates?
        Explicabo sed necessitatibus voluptatibus optio, aliquid molestias enim
        commodi voluptates eius nisi facere alias quaerat fugiat pariatur ea at
        et ab rerum consectetur tempora repudiandae veritatis velit illum.
        Molestiae illum reiciendis ea laudantium! Animi incidunt quisquam hic
        natus, impedit, illo dolorem ut nisi obcaecati architecto pariatur modi
        fugit delectus dolorum odio perspiciatis quia doloremque aliquid cum
        quae qui repudiandae, quas sit vitae. Labore, obcaecati nam laborum
        exercitationem fugit a necessitatibus eos nisi enim reprehenderit
        molestias! Quam maiores ullam ratione! Similique illum minima harum
        porro. Atque ea provident porro aut quis, commodi nostrum illo
        perferendis est autem quo delectus esse eligendi quibusdam natus
        possimus reiciendis nihil minus ipsa dolor voluptas quos dicta iure.
        Porro libero fuga quis cum incidunt pariatur fugit officiis illo, quasi
        sint facilis expedita soluta consequatur? Omnis neque non tenetur
        repudiandae? Quod nesciunt voluptate deleniti dolor dolore adipisci
        dolores vero! Porro eaque culpa vitae recusandae, eligendi rerum neque
        voluptates facilis modi quam itaque natus sint officia quod velit
        provident enim, ad deserunt exercitationem commodi nisi a eos. Ratione
        quos est deleniti aliquid! Possimus corrupti eius debitis, minima
        obcaecati aperiam ex doloremque dolorum fugit laboriosam tempore dolorem
        officia asperiores odit libero mollitia eveniet iste! Veniam
        exercitationem ullam dolores similique et harum dolorum at tempora
        sapiente, quia aliquid aspernatur ipsa quos quo velit dignissimos illo
        tempore cupiditate eveniet facere esse veritatis sint alias! Tenetur
        quasi iusto optio quis doloremque excepturi numquam. Beatae sunt debitis
        officiis? Est atque ratione ex repudiandae eaque esse veritatis id
        magnam ea modi! Recusandae dignissimos neque sapiente minus, atque ullam
        iusto cupiditate! Reiciendis sunt enim itaque autem vel, tempore culpa
        rem est rerum corporis qui doloremque inventore. Architecto nihil
        accusamus culpa quas perferendis facilis iusto magni esse velit debitis
        dignissimos, rem id, voluptate dolore, reiciendis in odio sapiente
        perspiciatis exercitationem? Fuga quidem, enim consequatur ex sit ea
        eaque nemo cupiditate vero ad soluta aspernatur deleniti, autem
        explicabo eveniet culpa nisi? Sunt possimus ducimus quibusdam atque
        cupiditate nihil ipsa molestias amet magnam enim dicta, omnis itaque,
        sint, ratione inventore fugiat ab illum ipsum sequi voluptatibus? Illum
        voluptatibus praesentium vel dolores molestias sint omnis quisquam,
        mollitia earum, labore recusandae rerum eveniet nobis, optio quod
        tenetur eaque corporis nostrum tempora? Modi, debitis saepe. Eum
        dignissimos quibusdam neque similique quidem voluptatum, autem aut quam
        quia recusandae perspiciatis aspernatur ipsum commodi architecto, at
        sequi? Rerum, qui soluta odit, doloremque dolor voluptates culpa est
        deleniti odio ipsum possimus animi sint pariatur accusamus. Deleniti
        blanditiis quo rem possimus aperiam sed quod eos iste expedita veritatis
        quisquam magni provident nisi libero, voluptates temporibus excepturi!
        Libero harum doloribus enim placeat, repellat officia neque repellendus
        ex odit dignissimos eum. Consectetur ut eligendi facilis blanditiis hic
        suscipit magnam reiciendis voluptatem animi neque temporibus nulla nisi,
        quo non autem, quaerat enim saepe. Ea, alias commodi, quibusdam harum,
        in delectus aspernatur vitae nulla cupiditate soluta iste veritatis
        possimus deleniti obcaecati sapiente eveniet ipsam mollitia officia
        numquam illum molestias accusantium. Autem qui eveniet quae! Eum ratione
        possimus soluta facere. Reiciendis perferendis optio enim dignissimos
        eos quaerat iste, quasi veniam, possimus eius ducimus quos nisi dolore
        molestias deserunt soluta natus exercitationem, aliquam aut facilis
        magni laudantium. Tempore consequatur, vero iusto voluptatibus porro
        eveniet perferendis doloribus quis commodi veniam deleniti laboriosam
        voluptate. Eum maiores quasi asperiores ipsam officia. Unde, accusamus
        iste officiis explicabo qui est corporis, ex sapiente totam veritatis
        necessitatibus quis voluptates quidem libero delectus aspernatur harum?
        Vitae qui quasi, sint nobis id numquam unde error ex mollitia labore
        quod odit illo asperiores! Temporibus quae vitae corporis qui,
        voluptatum deleniti itaque molestias eligendi, ex rem iusto possimus
        ipsam voluptate maiores officia nihil mollitia laudantium saepe? Ipsum
        dolores modi officiis pariatur, voluptates tempore sed suscipit ad
        omnis, veritatis corporis magni delectus! Perspiciatis repudiandae sint
        natus quas iste deleniti, quisquam veniam odio dolores accusantium
        nostrum pariatur cumque, sequi ab dolorem. Dolorum, sint! Quidem
        molestiae minima ut ratione labore soluta, nobis voluptas rerum at.
      </p>
      <Sidebar
        side='right'
        isOpen={open}
        setIsOpen={setOpen}
        title='Shopping Cart check check sidebar left and right check again'
      >
        <p>Your items go here...</p>
      </Sidebar>
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title='Edit Profile'
        description='Make changes to your profile here.'
      >
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Deleniti,
          dolorum.
        </p>
      </Modal>
    </div>
  );
}
